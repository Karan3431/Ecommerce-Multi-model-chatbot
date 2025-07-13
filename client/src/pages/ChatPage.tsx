import { useState } from 'react';
import { motion } from 'framer-motion';
import { useChat } from '@/hooks/useChat';
import { MessageList } from '@/components/MessageList';
import { ChatInput } from '@/components/ChatInput';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Headphones, BrainCircuit, ArrowLeft } from 'lucide-react';
import { LiveChatModal } from '@/components/LiveChatModal';
import { SarvamChatModal } from '@/components/SarvamChatModal';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function ChatPage() {
  const navigate = useNavigate();
  const [sessionId] = useState(uuidv4());
  
  const {
    messages,
    input,
    isLoading,
    handleInputChange,
    sendMessage,
    uploadFile,
  } = useChat(sessionId);
  
  const [isTextRagEnabled, setIsTextRagEnabled] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isVoiceRagEnabled, setIsVoiceRagEnabled] = useState(false);
  const [isSarvamChatOpen, setIsSarvamChatOpen] = useState(false);
  const [isSarvamRagEnabled, setIsSarvamRagEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              LuxeBot Chat
            </div>
          </motion.div>
          
          <div className="text-sm text-gray-400">
            Session: {sessionId.slice(0, 8)}...
          </div>
        </div>
      </motion.div>

      {/* Main Chat Interface */}
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <Card className="h-[80vh] flex flex-col shadow-2xl bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="border-b border-white/10 flex flex-row items-center justify-between p-4">
              <CardTitle className="text-white flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <BrainCircuit className="w-6 h-6 text-purple-400" />
                </motion.div>
                <span>AI Assistant</span>
              </CardTitle>
              
              <div className="flex items-center space-x-2">
                {/* Text RAG Toggle */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={isTextRagEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsTextRagEnabled(!isTextRagEnabled)}
                    className={`${
                      isTextRagEnabled 
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                        : "border-purple-500 text-purple-300 hover:bg-purple-500/10"
                    }`}
                  >
                    📄 Document Mode {isTextRagEnabled ? "ON" : "OFF"}
                  </Button>
                </motion.div>

                {/* Voice Chat Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLiveChatOpen(true)}
                    className="border-green-500 text-green-300 hover:bg-green-500/10"
                  >
                    <Headphones className="w-4 h-4 mr-2" />
                    Voice Chat
                  </Button>
                </motion.div>

                {/* Voice RAG Toggle */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={isVoiceRagEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsVoiceRagEnabled(!isVoiceRagEnabled)}
                    className={`${
                      isVoiceRagEnabled 
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" 
                        : "border-blue-500 text-blue-300 hover:bg-blue-500/10"
                    }`}
                  >
                    🎙️ Voice RAG {isVoiceRagEnabled ? "ON" : "OFF"}
                  </Button>
                </motion.div>

                {/* Sarvam Indian Language Chat */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSarvamChatOpen(true)}
                    className="border-orange-500 text-orange-300 hover:bg-orange-500/10"
                  >
                    🇮🇳 भारतीय भाषा
                  </Button>
                </motion.div>

                {/* Sarvam RAG Toggle */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={isSarvamRagEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsSarvamRagEnabled(!isSarvamRagEnabled)}
                    className={`${
                      isSarvamRagEnabled 
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" 
                        : "border-orange-500 text-orange-300 hover:bg-orange-500/10"
                    }`}
                  >
                    📚 Sarvam RAG {isSarvamRagEnabled ? "ON" : "OFF"}
                  </Button>
                </motion.div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-0 overflow-hidden">
              <MessageList messages={messages} isLoading={isLoading} />
            </CardContent>
            
            <div className="border-t border-white/10">
              <ChatInput
                input={input}
                isLoading={isLoading}
                handleInputChange={handleInputChange}
                sendMessage={sendMessage}
                uploadFile={uploadFile}
                isRagEnabled={isTextRagEnabled}
                onRagToggle={setIsTextRagEnabled}
              />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Voice Chat Modal */}
      <LiveChatModal
        isOpen={isLiveChatOpen}
        onOpenChange={setIsLiveChatOpen}
        isRagEnabled={isVoiceRagEnabled}
        sessionId={sessionId}
      />

      {/* Sarvam Indian Language Chat Modal */}
      <SarvamChatModal
        isOpen={isSarvamChatOpen}
        onOpenChange={setIsSarvamChatOpen}
        isRagEnabled={isSarvamRagEnabled}
        sessionId={sessionId}
      />
    </div>
  );
}
