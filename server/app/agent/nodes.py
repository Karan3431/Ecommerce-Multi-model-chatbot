# from langchain_anthropic import ChatAnthropic
from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq
from app.services import vector_store
from app.tools import web_search
from langchain_core.messages import HumanMessage
from app.core.config import settings

from app.agent.state import AgentState
import os 
from dotenv import load_dotenv


load_dotenv()

os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
# os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")



llm_gemini = ChatGoogleGenerativeAI(model=os.getenv("GEMINI_MODEL"), temperature=0)
# llm_groq = ChatGroq(model=os.getenv("GROQ_MODEL"), temperature=0)

llm_gemini_rag = ChatGoogleGenerativeAI(
    model=os.getenv("GEMINI_MODEL"),
    temperature=0.7,
    convert_system_message_to_human=True # Important for Gemini
)


def route_to_llm(state: AgentState) -> str:
    """According to the prompt decide which LLm to use"""
    lastmessage = state["messages"][-1].content
    
    if "creative" in lastmessage.lower() or "write" in lastmessage.lower():
        return "gemini"
    
    if "code" in lastmessage.lower() or "python" in lastmessage.lower():
        return "groq"
    
    return "ginini"



# def generate_gemini(state: AgentState):
#     """Node to call Gimini."""
#     human_messages = [msg for msg in state["messages"] if isinstance(msg, HumanMessage)] 
#     response = llm_gemini.invoke(human_messages)
#     return {"messages": [response]}

def generate_gemini(state: AgentState):
    last_msg = state["messages"][-1].content.strip()

    if not last_msg:
        raise ValueError("Last message content is empty — cannot invoke Gemini.")

    # Ensure proper format: list of message objects
    messages = [HumanMessage(content=last_msg)]
    
    response = llm_gemini.invoke(messages)
    return {"messages": [response]}

# def generate_groq(state: AgentState):
#     """Node to call Groq."""
#     response = llm_groq.invoke(state["messages"])
#     return {"messages": [response]}


# ---- similar for other model






# def check_for_rag(state: AgentState):
#     """Decides which tool to use, if any."""
#     last_message = state["messages"][-1].content.lower()
    
#     # Priority 1: Check for explicit RAG flag
#     if state.get("use_rag", False):
#         print("---ROUTING: RAG---")
#         return "rag_retrieval"
    
#     # Priority 2: Check for keywords implying web search
#     search_keywords = ["latest", "what is the current", "search for", "tavily"]
#     if any(keyword in last_message for keyword in search_keywords):
#         print("---ROUTING: Web Search---")
#         return "web_search"
    
#     # Default: No tool needed, go to the LLM router
#     print("---ROUTING: Direct to LLM---")
#     return "__end__" # LangGraph convention for routing to another router

def check_for_rag(state: AgentState):
    """
    Enhanced router that checks for RAG, web search keywords, or direct generation.
    This node acts as a router to decide the agent's path.
    Its string return value is used by the conditional edge router.
    """
    print(f"--- ROUTER: Checking routing options ---")
    print(f"use_rag flag: {state.get('use_rag')}")
    
    # Priority 1: Check for explicit RAG flag
    if state.get("use_rag", False):
        print("---ROUTING: RAG retrieval---")
        return "rag_retrieval"
    
    # Priority 2: Check for web search keywords
    last_message = state["messages"][-1].content.lower()
    search_keywords = [
        "latest", "current", "recent", "news", "today", "2024", "2025",
        "search for", "find information about", "what's happening",
        "web search", "google", "internet", "online information",
        "real-time", "live", "up-to-date", "newest"
    ]
    
    if any(keyword in last_message for keyword in search_keywords):
        print("---ROUTING: Web search---")
        return "web_search"
    
    # Default: Direct generation
    print("---ROUTING: Direct generation---")
    return "generate_direct"
    
    
    
def retrieve_from_rag(state: AgentState):
    """
    Retrieves relevant documents from the ChromaDB vector store,
    filtered by the session_id from the agent's state.
    """
    
    print("Retrieving context from RAG...")
    user_query = state["messages"][-1].content
    session_id = state.get("session_id")
    
    if not session_id:
        print("Warning: No session_id found in state for RAG retrieval.")
        return {"context": "Error: No session ID provided for document retrieval."}
    
    retriever = vector_store.get_retriever(session_id=session_id)
    
    retrieved_docs = retriever.invoke(user_query)
    
    context = "\n\n".join([doc.page_content for doc in retrieved_docs])
    
    print(f"Retrieved context for session {session_id}: {context[:300]}...")
    
    return {"context": context}

# def generate_direct(state: AgentState):
#     """Node to call the primary LLM directly without context."""
#     print("Generating direct response...")
#     # Using Gemini Pro as the default direct LLM
#     response = llm_gemini.invoke(state["messages"])
#     return {"messages": [response]}

def run_web_search(state: AgentState):
    """Node to perform web search using Tavily."""
    print("--- NODE: Running web search ---")
    try:
        search_tool = web_search.get_web_search_tool()
        user_query = state["messages"][-1].content
        print(f"Searching for: {user_query}")
        
        search_results = search_tool.invoke({"query": user_query})
        
        # Format the search results for better context
        if isinstance(search_results, list):
            formatted_context = "\n\n".join([
                f"Source: {result.get('url', 'Unknown')}\n{result.get('content', '')}"
                for result in search_results[:3]  # Limit to top 3 results
            ])
        else:
            formatted_context = str(search_results)
        
        print(f"Web search results: {formatted_context[:200]}...")
        return {"context": formatted_context}
        
    except Exception as e:
        print(f"Error during web search: {e}")
        return {"context": f"Web search failed: {str(e)}. Please try asking a different question."}

def generate_with_web_context(state: AgentState):
    """
    Generates a response using the LLM with web search context.
    """
    print("--- NODE: Generating response with web context ---")
    user_query = state["messages"][-1].content
    context = state.get("context", "")

    prompt = f"""You are a helpful assistant with access to current web information. Use the following web search results to answer the user's question accurately and comprehensively.

Web Search Results:
{context}

User Question: {user_query}

Instructions:
- Provide a comprehensive answer based on the search results
- Include relevant details and sources when possible
- If the search results don't contain enough information, say so
- Be factual and accurate

Answer:"""

    try:
        messages = [HumanMessage(content=prompt)]
        response = llm_gemini_rag.invoke(messages)
        print(f"Generated web response: {response.content[:100]}...")
        return {"messages": [response]}
    except Exception as e:
        print(f"Error generating web response: {e}")
        error_response = HumanMessage(content=f"I apologize, but I encountered an error while processing the web search results: {str(e)}")
        return {"messages": [error_response]}

def generate_with_context(state: AgentState):
    """
    Generates a response using the LLM with the retrieved context.
    This is the final step in the RAG path.
    """
    print("--- NODE: Generating response with context ---")
    user_query = state["messages"][-1].content
    context = state.get("context", "")

    # --- NEW, IMPROVED PROMPT ---
    prompt = f"""You are an intelligent assistant. Use the following document snippets as your primary source of knowledge to answer the user's question. The snippets are from a document the user just uploaded.

    If the user's question is general, like "what is this document about?" or "summarize this file", provide a concise summary of the provided context.

    If the user asks a specific question, answer it directly using only the information in the snippets.

    If the snippets do not contain the answer to a specific question, state that the provided document doesn't seem to contain that information.

    DOCUMENT SNIPPETS:
    ---
    {context}
    ---

    USER'S QUESTION:
    "{user_query}"
    """
    # --------------------------

    # We replace the user's last message with this new, enriched prompt
    messages_for_llm = state["messages"][:-1] + [
        ( "user", prompt)
    ]

    response = llm_gemini.invoke(messages_for_llm)
    return {"messages": [response]}

def generate_direct(state: AgentState):
    """
    Generates a response using the LLM directly, without any RAG context.
    This is the standard chat path.
    """
    print("--- NODE: Generating direct response (no RAG) ---")
    response = llm_gemini.invoke(state["messages"])
    return {"messages": [response]}


def agent_entry(state: AgentState):
    """A dummy entry point node that does nothing but start the graph."""
    print("--- AGENT ENTRY ---")
    return {} # It's a valid node because it returns a dictionary