import { useState, useRef, useCallback, useEffect } from 'react';

export type SarvamConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
export type SarvamConversationStatus = 'idle' | 'recording' | 'processing' | 'speaking';

export function useSarvamVoiceChat(isRagEnabled: boolean, sessionId: string, selectedLanguage: string, selectedVoice: string = 'anushka') {
  const [connectionStatus, setConnectionStatus] = useState<SarvamConnectionStatus>('disconnected');
  const [conversationStatus, setConversationStatus] = useState<SarvamConversationStatus>('idle');
  const [transcript, setTranscript] = useState<string>('');
  
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const workletRef = useRef<AudioWorkletNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const connect = useCallback(async () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('Sarvam WebSocket already connected');
      return;
    }

    console.log('Connecting to Sarvam WebSocket...');
    setConnectionStatus('connecting');

    try {
      // Request microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true 
        } 
      });
      
      streamRef.current = stream;

      // Setup audio context and worklet
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      await audioContext.audioWorklet.addModule('/worklets/audio-processor.js');
      
      const source = audioContext.createMediaStreamSource(stream);
      const workletNode = new AudioWorkletNode(audioContext, 'audio-processor');
      workletRef.current = workletNode;

      source.connect(workletNode);

      // Connect to Sarvam WebSocket
      const ws = new WebSocket('ws://localhost:8000/ws/v1/sarvam-live-chat');
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Sarvam WebSocket connected');
        setConnectionStatus('connected');
        
        // Send initial configuration
        ws.send(JSON.stringify({
          config: {
            isRagEnabled,
            sessionId,
            language: selectedLanguage,
            voice: selectedVoice
          }
        }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Sarvam WebSocket message:', data);

          switch (data.type) {
            case 'languages':
              console.log('Received supported languages:', data.languages);
              break;
              
            case 'transcript':
              setTranscript(data.text);
              setConversationStatus('processing');
              break;
              
            case 'audio_response':
              // Play audio response
              if (data.audio_chunk) {
                const audioData = atob(data.audio_chunk);
                const audioBuffer = new ArrayBuffer(audioData.length);
                const view = new Uint8Array(audioBuffer);
                for (let i = 0; i < audioData.length; i++) {
                  view[i] = audioData.charCodeAt(i);
                }
                
                audioContext.decodeAudioData(audioBuffer).then(decodedBuffer => {
                  const source = audioContext.createBufferSource();
                  source.buffer = decodedBuffer;
                  source.connect(audioContext.destination);
                  source.start();
                  
                  setConversationStatus('speaking');
                  
                  source.onended = () => {
                    setConversationStatus('idle');
                  };
                }).catch(err => {
                  console.error('Error decoding audio:', err);
                  setConversationStatus('idle');
                });
              }
              break;
              
            case 'text_response':
              // Handle text response for display
              console.log('AI Response:', data.text);
              setConversationStatus('idle');
              break;
              
            case 'error':
              console.error('Sarvam error:', data.message);
              setConnectionStatus('error');
              break;
              
            default:
              console.log('Unknown message type:', data.type);
          }
        } catch (error) {
          console.error('Error parsing Sarvam WebSocket message:', error);
        }
      };

      ws.onclose = () => {
        console.log('Sarvam WebSocket disconnected');
        setConnectionStatus('disconnected');
        setConversationStatus('idle');
      };

      ws.onerror = (error) => {
        console.error('Sarvam WebSocket error:', error);
        setConnectionStatus('error');
      };

      // Setup audio worklet message handling
      workletNode.port.onmessage = (event) => {
        if (event.data.type === 'audio' && ws.readyState === WebSocket.OPEN && conversationStatus === 'recording') {
          const audioData = event.data.audio;
          const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioData)));
          
          ws.send(JSON.stringify({
            type: 'audio_chunk',
            audio_chunk: base64Audio
          }));
        }
      };

    } catch (error) {
      console.error('Error setting up Sarvam audio:', error);
      setConnectionStatus('error');
    }
  }, [isRagEnabled, sessionId, selectedLanguage, selectedVoice, conversationStatus]);

  const disconnect = useCallback(() => {
    console.log('Disconnecting Sarvam...');
    
    // Stop recording if active
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }

    // Stop worklet
    if (workletRef.current) {
      workletRef.current.disconnect();
      workletRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Stop media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setConnectionStatus('disconnected');
    setConversationStatus('idle');
    setTranscript('');
  }, []);

  const toggleRecording = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.log('Sarvam WebSocket not connected');
      return;
    }

    if (conversationStatus === 'idle') {
      console.log('Starting Sarvam recording...');
      setConversationStatus('recording');
      setTranscript('');
      
      // Start recording via worklet
      if (workletRef.current) {
        workletRef.current.port.postMessage({ type: 'start' });
      }
    } else if (conversationStatus === 'recording') {
      console.log('Stopping Sarvam recording...');
      setConversationStatus('processing');
      
      // Stop recording via worklet
      if (workletRef.current) {
        workletRef.current.port.postMessage({ type: 'stop' });
      }
    }
  }, [conversationStatus]);

  // Update language when it changes
  useEffect(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'language_change',
        language: selectedLanguage
      }));
    }
  }, [selectedLanguage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    connectionStatus,
    conversationStatus,
    transcript,
    connect,
    disconnect,
    toggleRecording,
  };
}
