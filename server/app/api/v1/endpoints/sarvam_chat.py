from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse
import json
import asyncio
import base64
from app.core.config import settings
from app.services.sarvam_service import sarvam_service, SARVAM_LANGUAGES
from app.services import vector_store 
from app.agent.graph import create_agent_graph
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

router = APIRouter()

# Initialize LLM for text generation
llm = ChatGoogleGenerativeAI(
    model=settings.GEMINI_MODEL,
    google_api_key=settings.GOOGLE_API_KEY,
    temperature=0.7
)

def get_rag_context_for_session(session_id: str) -> str:
    """
    Fetches all documents for a given session and concatenates their content
    to create a broad context for the entire voice conversation.
    """
    if not session_id:
        return "No session ID was provided."
        
    print(f"Fetching RAG context for session_id: {session_id}")
    try:
        retriever = vector_store.get_retriever(session_id=session_id, search_kwargs={"k": 10})
        all_docs = retriever.get_relevant_documents("all content about the uploaded documents") 
        
        if not all_docs:
            print(f"No documents found for session_id: {session_id}")
            return "No documents were found for this session."
            
        context = "\n\n---\n\n".join([doc.page_content for doc in all_docs])
        print(f"Found {len(all_docs)} document chunks for context.")
        return context
    except Exception as e:
        print(f"Error fetching RAG context: {e}")
        return "Error retrieving document context."


@router.websocket("/sarvam-live-chat")
async def sarvam_live_chat(websocket: WebSocket):
    await websocket.accept()
    print("Sarvam WebSocket connection accepted.")

    # Send supported languages and voices to client
    await websocket.send_text(json.dumps({
        "type": "languages",
        "languages": sarvam_service.get_supported_languages(),
        "voices": sarvam_service.get_available_voices()
    }))

    try:
        # Wait for initial config from client
        initial_config_raw = await websocket.receive_text()
        initial_config = json.loads(initial_config_raw).get("config", {})
        
        is_rag_enabled = initial_config.get("isRagEnabled", False)
        session_id = initial_config.get("sessionId")
        selected_language = initial_config.get("language", "hindi")
        selected_voice = initial_config.get("voice", "anushka")  # Default to Anushka
        
        print(f"Sarvam chat config - RAG: {is_rag_enabled}, Language: {selected_language}, Voice: {selected_voice}, Session: {session_id}")
        
        # Create agent graph for better AI responses
        agent_graph = create_agent_graph()
        
        # Prepare system context
        language_name = SARVAM_LANGUAGES[selected_language]['name']
        system_context = f"You are a helpful AI assistant speaking in {language_name}. Keep responses concise and natural."
        
        if is_rag_enabled:
            print("Sarvam Voice RAG mode enabled. Fetching context...")
            rag_context = get_rag_context_for_session(session_id)
            system_context = f"""You are an intelligent assistant. Answer questions based only on the provided documents. 
            Respond in {language_name} language.
            If the answer is not in the documents, say 'The provided documents do not contain that information' in {language_name}.

            DOCUMENTS:
            ---
            {rag_context}
            ---
            
            Answer the user's questions based on these documents in {language_name}.
            """

        async def handle_audio_input():
            """Handle incoming audio from browser"""
            while True:
                try:
                    message = await websocket.receive_text()
                    data = json.loads(message)
                    
                    if data.get("type") == "audio_chunk":
                        # Decode base64 audio
                        audio_data = base64.b64decode(data["audio_chunk"])
                        
                        # Convert speech to text using Sarvam
                        transcript = await sarvam_service.speech_to_text(audio_data, selected_language)
                        
                        if transcript:
                            print(f"Transcript ({selected_language}): {transcript}")
                            
                            # Send transcript to client for display
                            await websocket.send_text(json.dumps({
                                "type": "transcript",
                                "text": transcript,
                                "language": selected_language
                            }))
                            
                            # Generate AI response using agent graph for better routing
                            try:
                                # Use agent graph for better responses
                                agent_state = {
                                    "messages": [HumanMessage(content=transcript)],
                                    "use_rag": is_rag_enabled,
                                    "session_id": session_id
                                }
                                
                                result = await asyncio.to_thread(agent_graph.invoke, agent_state)
                                response_text = result["messages"][-1].content
                                
                                # Translate to selected language if not English
                                if selected_language != "english":
                                    response_text = await sarvam_service.translate_text(
                                        response_text, "english", selected_language
                                    )
                                
                                print(f"AI Response ({selected_language}): {response_text}")
                                
                                # Send text response to client
                                await websocket.send_text(json.dumps({
                                    "type": "ai_response",
                                    "text": response_text,
                                    "language": selected_language,
                                    "voice": selected_voice
                                }))
                                
                                # Convert response to speech using Sarvam with selected voice
                                audio_response = await sarvam_service.text_to_speech(
                                    response_text, selected_language, selected_voice
                                )
                                
                                if audio_response:
                                    # Encode audio to base64 and send
                                    audio_base64 = base64.b64encode(audio_response).decode('utf-8')
                                    await websocket.send_text(json.dumps({
                                        "type": "audio_response",
                                        "audio_chunk": audio_base64,
                                        "language": selected_language,
                                        "voice": selected_voice,
                                        "text": response_text
                                    }))
                                    
                            except Exception as e:
                                print(f"Error generating AI response: {e}")
                                await websocket.send_text(json.dumps({
                                    "type": "error",
                                    "message": f"Error generating response: {str(e)}"
                                }))
                        
                except WebSocketDisconnect:
                    print("Sarvam WebSocket disconnected by client")
                    break
                except Exception as e:
                    print(f"Error in audio input handler: {e}")
                    await websocket.send_text(json.dumps({
                        "type": "error",
                        "message": f"Audio processing error: {str(e)}"
                    }))

        # Start audio handling
        await handle_audio_input()

    except WebSocketDisconnect:
        print("Sarvam WebSocket connection closed by client.")
    except Exception as e:
        print(f"An error occurred in Sarvam live chat: {e}")
        try:
            await websocket.send_text(json.dumps({
                "type": "error",
                "message": f"Connection error: {str(e)}"
            }))
        except:
            pass
    finally:
        print("Sarvam live chat session ended.")


@router.get("/sarvam-languages")
async def get_sarvam_languages():
    """Get list of supported Sarvam languages and voices"""
    try:
        return {
            "languages": sarvam_service.get_supported_languages(),
            "voices": sarvam_service.get_available_voices(),
            "status": "success"
        }
    except Exception as e:
        return {
            "error": f"Failed to get languages: {str(e)}",
            "status": "error"
        }

@router.post("/sarvam-test-tts")
async def test_sarvam_tts():
    """Test Sarvam TTS functionality"""
    try:
        test_text = "नमस्ते! मैं सरवम एआई असिस्टेंट हूं।"  # Hello! I am Sarvam AI Assistant in Hindi
        audio_data = await sarvam_service.text_to_speech(test_text, "hindi", "anushka")
        
        if audio_data:
            audio_base64 = base64.b64encode(audio_data).decode('utf-8')
            return {
                "status": "success",
                "audio_base64": audio_base64,
                "language": "hindi",
                "voice": "anushka",
                "text": test_text,
                "message": "Sarvam TTS test successful!"
            }
        else:
            return {
                "error": "Failed to generate speech",
                "status": "error"
            }
    except Exception as e:
        return {
            "error": f"TTS test failed: {str(e)}",
            "status": "error"
        }
