import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Mic, PhoneOff, Loader2, Square, Globe, Languages } from 'lucide-react';
import { useSarvamVoiceChat } from '@/hooks/useSarvamVoiceChat';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SarvamChatModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isRagEnabled: boolean;
  sessionId: string;
}

const AudioVisualizer = () => (
  <motion.div 
    className="flex justify-center items-center gap-1 h-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    {[...Array(7)].map((_, i) => (
      <motion.span
        key={i}
        className="w-1 bg-gradient-to-t from-orange-500 to-red-500 rounded-full"
        animate={{
          height: [8, 20, 8],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeInOut",
        }}
      />
    ))}
  </motion.div>
);

const languages = [
  { key: "hindi", name: "हिंदी", flag: "🇮🇳", code: "hi-IN" },
  { key: "bengali", name: "বাংলা", flag: "🇧🇩", code: "bn-IN" },
  { key: "gujarati", name: "ગુજરાતી", flag: "🇮🇳", code: "gu-IN" },
  { key: "kannada", name: "ಕನ್ನಡ", flag: "🇮🇳", code: "kn-IN" },
  { key: "malayalam", name: "മലയാളം", flag: "🇮🇳", code: "ml-IN" },
  { key: "marathi", name: "मराठी", flag: "🇮🇳", code: "mr-IN" },
  { key: "odia", name: "ଓଡ଼ିଆ", flag: "🇮🇳", code: "or-IN" },
  { key: "punjabi", name: "ਪੰਜਾਬੀ", flag: "🇮🇳", code: "pa-IN" },
  { key: "tamil", name: "தமிழ்", flag: "🇮🇳", code: "ta-IN" },
  { key: "telugu", name: "తెలుగు", flag: "🇮🇳", code: "te-IN" },
  { key: "english", name: "English", flag: "🇬🇧", code: "en-IN" }
];

const voices = [
  { key: "anushka", name: "Anushka", gender: "female", style: "professional" },
  { key: "abhilash", name: "Abhilash", gender: "male", style: "confident" },
  { key: "manisha", name: "Manisha", gender: "female", style: "friendly" },
  { key: "meera", name: "Meera", gender: "female", style: "traditional" },
  { key: "kalpana", name: "Kalpana", gender: "female", style: "gentle" },
  { key: "ishani", name: "Ishani", gender: "female", style: "modern" },
  { key: "nandini", name: "Nandini", gender: "female", style: "elegant" },
  { key: "neerja", name: "Neerja", gender: "female", style: "warm" },
  { key: "supriya", name: "Supriya", gender: "female", style: "cheerful" },
  { key: "subhashini", name: "Subhashini", gender: "female", style: "calm" },
  { key: "gurleen", name: "Gurleen", gender: "female", style: "vibrant" },
  { key: "kabir", name: "Kabir", gender: "male", style: "strong" },
  { key: "ananya", name: "Ananya", gender: "female", style: "youthful" },
  { key: "arya", name: "Arya", gender: "male", style: "neutral" }
];

export function SarvamChatModal({ isOpen, onOpenChange, isRagEnabled, sessionId }: SarvamChatModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("hindi");
  const [selectedVoice, setSelectedVoice] = useState("anushka"); // Default to Anushka
  const { connectionStatus, conversationStatus, connect, disconnect, toggleRecording, transcript } = 
    useSarvamVoiceChat(isRagEnabled, sessionId, selectedLanguage, selectedVoice);

  useEffect(() => {
    if (isOpen && connectionStatus === 'disconnected') {
      connect();
    }
  }, [isOpen, connectionStatus, connect]);

  const handleEndCall = () => {
    disconnect();
    onOpenChange(false);
  };

  const renderStatusDescription = () => {
    const selectedLang = languages.find(lang => lang.key === selectedLanguage);
    switch (conversationStatus) {
      case 'recording': return `${selectedLang?.flag} सुन रहे हैं... (Listening...)`;
      case 'processing': return `${selectedLang?.flag} सोच रहे हैं... (Thinking...)`;
      case 'speaking': return `${selectedLang?.flag} बोल रहे हैं... (Speaking...)`;
      default: return isRagEnabled 
        ? `${selectedLang?.flag} अपने दस्तावेज़ों के बारे में पूछें (Ask about your documents)`
        : `${selectedLang?.flag} माइक दबाएं और बोलना शुरू करें (Press mic and start speaking)`;
    }
  };

  const canTalk = conversationStatus === 'idle' || conversationStatus === 'recording';
  const selectedLang = languages.find(lang => lang.key === selectedLanguage);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleEndCall()}>
      <DialogContent 
        className="sm:max-w-lg"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-orange-500" />
            <span>Sarvam Voice Chat</span>
            {isRagEnabled && (
              <Badge className="bg-blue-500 text-white">RAG Mode</Badge>
            )}
          </DialogTitle>
          <DialogDescription>{renderStatusDescription()}</DialogDescription>
        </DialogHeader>

        {/* Language and Voice Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Language Selection */}
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Languages className="w-5 h-5 text-orange-500" />
                <span className="font-medium">Language</span>
              </div>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
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
            </CardContent>
          </Card>

          {/* Voice Selection */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Mic className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Voice</span>
              </div>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.key} value={voice.key}>
                      <div className="flex items-center space-x-2">
                        <span>{voice.gender === 'female' ? '👩' : '👨'}</span>
                        <div className="flex flex-col">
                          <span className="font-medium">{voice.name}</span>
                          <span className="text-xs text-gray-500">{voice.style}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Voice Interface */}
        <div className="flex flex-col items-center justify-center h-64 gap-6">
          {connectionStatus === 'connecting' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Connecting to Sarvam...</p>
            </motion.div>
          )}
          
          {connectionStatus === 'connected' && (
            <motion.div 
              className='flex flex-col items-center gap-6'
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {/* Language Flag Display */}
              <motion.div 
                className="text-6xl"
                animate={{ 
                  scale: conversationStatus === 'speaking' ? [1, 1.1, 1] : 1 
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: conversationStatus === 'speaking' ? Infinity : 0 
                }}
              >
                {selectedLang?.flag}
              </motion.div>

              {/* Audio Visualizer or Processing Indicator */}
              <div className="h-12 w-full flex items-center justify-center">
                {conversationStatus === 'speaking' && <AudioVisualizer />}
                {conversationStatus === 'processing' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="h-8 w-8 text-orange-500" />
                  </motion.div>
                )}
              </div>

              {/* Transcript Display */}
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-sm text-center text-sm"
                >
                  <span className="text-gray-600 dark:text-gray-400">"{transcript}"</span>
                </motion.div>
              )}

              {/* Microphone Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className={cn(
                    "w-20 h-20 rounded-full transition-all duration-300 transform",
                    {
                      "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg": conversationStatus === 'idle',
                      "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse shadow-red-300 shadow-lg": conversationStatus === 'recording',
                      "bg-gray-400 cursor-not-allowed": !canTalk,
                      "opacity-50": conversationStatus === 'processing' || conversationStatus === 'speaking'
                    }
                  )}
                  onClick={toggleRecording}
                  disabled={!canTalk}
                >
                  {conversationStatus === 'recording' ? (
                    <Square className="h-8 w-8 fill-white" />
                  ) : (
                    <Mic className="h-8 w-8" />
                  )}
                </Button>
              </motion.div>

              {/* Status Text */}
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {selectedLang?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {canTalk ? "Press to speak" : "Please wait..."}
                </p>
              </div>
            </motion.div>
          )}

          {connectionStatus === 'error' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center text-red-500"
            >
              <p>Connection failed. Check permissions & console.</p>
            </motion.div>
          )}
        </div>

        <DialogFooter>
          <Button variant="destructive" onClick={handleEndCall}>
            <PhoneOff className="mr-2 h-4 w-4" /> End Call
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
