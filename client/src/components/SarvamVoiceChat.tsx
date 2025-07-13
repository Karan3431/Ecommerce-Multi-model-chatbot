import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Globe,
  Bot,
  Sparkles,
  Send,
  FileText,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Language {
  key: string;
  name: string;
  code: string;
  voice: string;
  flag: string;
}

interface Voice {
  key: string;
  name: string;
  gender: string;
  style: string;
}

interface SarvamVoiceChatProps {
  sessionId: string;
  isRagEnabled: boolean;
  onClose: () => void;
}

export default function SarvamVoiceChat({ sessionId, isRagEnabled, onClose }: SarvamVoiceChatProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const [selectedVoice, setSelectedVoice] = useState('anushka');
  const [languages, setLanguages] = useState<Language[]>([]);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [textInput, setTextInput] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [isLoading, setIsLoading] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize audio context
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioContextClass();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Connect to Sarvam WebSocket
  useEffect(() => {
    const connectToSarvam = async () => {
      try {
        setConnectionStatus('Connecting to Sarvam...');
        
        // First get supported languages and voices
        const response = await fetch('/api/v1/sarvam-languages');
        const data = await response.json();
        
        if (data.languages) {
          setLanguages(data.languages);
        }
        if (data.voices) {
          setVoices(data.voices);
        }

        // Connect to WebSocket
        const ws = new WebSocket('ws://localhost:8000/ws/v1/sarvam-live-chat');
        wsRef.current = ws;

        ws.onopen = () => {
          setIsConnected(true);
          setConnectionStatus('Connected');
          
          // Send initial configuration
          const config = {
            config: {
              sessionId,
              isRagEnabled,
              language: selectedLanguage,
              voice: selectedVoice
            }
          };
          ws.send(JSON.stringify(config));
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          handleWebSocketMessage(data);
        };

        ws.onclose = () => {
          setIsConnected(false);
          setConnectionStatus('Disconnected');
        };

        ws.onerror = (error) => {
          console.error('Sarvam WebSocket error:', error);
          setConnectionStatus('Connection Error');
        };

      } catch (error) {
        console.error('Error connecting to Sarvam:', error);
        setConnectionStatus('Failed to Connect');
      }
    };

    connectToSarvam();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [sessionId, isRagEnabled, selectedLanguage, selectedVoice]);

  const handleWebSocketMessage = (data: Record<string, unknown>) => {
    switch (data.type) {
      case 'languages':
        if (Array.isArray(data.languages)) setLanguages(data.languages as Language[]);
        if (Array.isArray(data.voices)) setVoices(data.voices as Voice[]);
        break;
      
      case 'transcript':
        if (typeof data.text === 'string') setTranscript(data.text);
        break;
      
      case 'ai_response':
        if (typeof data.text === 'string') setAiResponse(data.text);
        setIsLoading(false);
        break;
      
      case 'audio_response':
        if (typeof data.audio_chunk === 'string') {
          playAudioFromBase64(data.audio_chunk);
        }
        break;
      
      case 'error':
        if (typeof data.message === 'string') {
          console.error('Sarvam error:', data.message);
        }
        setIsLoading(false);
        break;
    }
  };

  const playAudioFromBase64 = async (audioBase64: string) => {
    try {
      setIsPlaying(true);
      const audioBytes = Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0));
      const audioBuffer = await audioContextRef.current!.decodeAudioData(audioBytes.buffer.slice());
      const source = audioContextRef.current!.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current!.destination);
      source.onended = () => setIsPlaying(false);
      source.start();
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const arrayBuffer = await audioBlob.arrayBuffer();
        const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: 'audio_chunk',
            audio_chunk: base64Audio
          }));
          setIsLoading(true);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    // Send updated config to server
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        config: {
          sessionId,
          isRagEnabled,
          language,
          voice: selectedVoice
        }
      }));
    }
  };

  const handleVoiceChange = (voice: string) => {
    setSelectedVoice(voice);
    // Send updated config to server
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        config: {
          sessionId,
          isRagEnabled,
          language: selectedLanguage,
          voice
        }
      }));
    }
  };

  const sendTextMessage = () => {
    if (textInput.trim() && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'text_input',
        text: textInput
      }));
      setTextInput('');
      setIsLoading(true);
    }
  };

  const selectedLanguageData = languages.find(lang => lang.key === selectedLanguage);
  const selectedVoiceData = voices.find(voice => voice.key === selectedVoice);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <Card className="bg-gradient-to-br from-slate-900 to-purple-900 border-purple-500/30 text-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: isConnected ? 360 : 0 }}
                  transition={{ duration: 2, repeat: isConnected ? Infinity : 0, ease: "linear" }}
                >
                  <Globe className="w-6 h-6 text-green-400" />
                </motion.div>
                <div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Sarvam AI Voice Chat
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={isConnected ? "default" : "destructive"} className="text-xs">
                      {connectionStatus}
                    </Badge>
                    {isRagEnabled && (
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        <FileText className="w-3 h-3 mr-1" />
                        RAG Enabled
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Language and Voice Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Select Language</label>
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="bg-white/10 border-purple-500/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-purple-500/30">
                    {languages.map((lang) => (
                      <SelectItem key={lang.key} value={lang.key}>
                        <div className="flex items-center space-x-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Select Voice</label>
                <Select value={selectedVoice} onValueChange={handleVoiceChange}>
                  <SelectTrigger className="bg-white/10 border-purple-500/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-purple-500/30">
                    {voices.map((voice) => (
                      <SelectItem key={voice.key} value={voice.key}>
                        <div className="flex items-center space-x-2">
                          <span>{voice.gender === 'female' ? '👩' : '👨'}</span>
                          <span>{voice.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {voice.style}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Current Selection Display */}
            {selectedLanguageData && selectedVoiceData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-500/20 rounded-lg p-4 border border-purple-500/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{selectedLanguageData.flag}</span>
                    <div>
                      <div className="font-medium">{selectedLanguageData.name}</div>
                      <div className="text-sm text-gray-300">
                        Voice: {selectedVoiceData.name} ({selectedVoiceData.style})
                      </div>
                    </div>
                  </div>
                  <Heart className="w-5 h-5 text-red-400" />
                </div>
              </motion.div>
            )}

            {/* Voice Controls */}
            <div className="flex items-center justify-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={!isConnected}
                  className={cn(
                    "w-16 h-16 rounded-full",
                    isRecording
                      ? "bg-red-500 hover:bg-red-600 animate-pulse"
                      : "bg-purple-500 hover:bg-purple-600"
                  )}
                >
                  {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </Button>
              </motion.div>

              <div className="text-center">
                <div className="text-sm text-gray-300 mb-1">
                  {isRecording ? 'Recording...' : isPlaying ? 'Playing...' : 'Ready'}
                </div>
                <div className="flex items-center space-x-2">
                  {isLoading && <Sparkles className="w-4 h-4 animate-spin text-purple-400" />}
                  {isPlaying && <Volume2 className="w-4 h-4 text-green-400" />}
                </div>
              </div>
            </div>

            {/* Text Input Alternative */}
            <div className="flex space-x-2">
              <Input
                placeholder={`Type in ${selectedLanguageData?.name || 'selected language'}...`}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendTextMessage()}
                className="bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={sendTextMessage}
                  disabled={!textInput.trim() || !isConnected}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>

            {/* Conversation Display */}
            {(transcript || aiResponse) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 bg-black/20 rounded-lg p-4 border border-white/10 max-h-48 overflow-y-auto"
              >
                {transcript && (
                  <div className="bg-blue-500/20 rounded-lg p-3 border-l-4 border-blue-500">
                    <div className="text-xs text-gray-300 mb-1">You said:</div>
                    <div className="text-white">{transcript}</div>
                  </div>
                )}
                
                {aiResponse && (
                  <div className="bg-purple-500/20 rounded-lg p-3 border-l-4 border-purple-500">
                    <div className="text-xs text-gray-300 mb-1 flex items-center">
                      <Bot className="w-3 h-3 mr-1" />
                      AI Response:
                    </div>
                    <div className="text-white">{aiResponse}</div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Instructions */}
            <div className="text-xs text-gray-400 text-center space-y-1">
              <div>🎙️ Click the mic to start voice recording</div>
              <div>💬 Or type your message in {selectedLanguageData?.name || 'your selected language'}</div>
              <div>🌍 AI will respond in your chosen language with {selectedVoiceData?.name || 'selected'} voice</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
