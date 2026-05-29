import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Mic, MicOff, Trash2, Download, Menu,
  Sparkles, ChevronRight
} from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import Sidebar from './Sidebar';
import { exportChatAsPDF } from '../utils/pdfExport';

const SUGGESTED_PROMPTS = [
  { icon: '🐍', text: 'Write a Python script for data analysis', category: 'coding' },
  { icon: '📊', text: 'Explain machine learning concepts', category: 'analytics' },
  { icon: '✍️', text: 'Write a professional cover letter', category: 'writing' },
  { icon: '🔍', text: 'Research trends in AI industry 2025', category: 'research' },
  { icon: '⚙️', text: 'Debug this JavaScript code', category: 'coding' },
  { icon: '📈', text: 'Analyze this dataset and find insights', category: 'analytics' },
];

const ChatInterface = () => {
  const { user } = useAuth();
  const {
    activeChat, activeChatId, isLoading, sendMessage, createNewChat, clearChat, activeModel,
  } = useChat();

  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeChatId]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    let chatId = activeChatId;
    if (!chatId) chatId = createNewChat();
    const msg = input.trim();
    setInput('');
    await sendMessage(msg, chatId);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input not supported in this browser.');
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'en-US';
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(prev => prev + (prev ? ' ' : '') + transcript);
    };
    rec.onend = () => setIsListening(false);
    rec.onerror = () => setIsListening(false);
    recognitionRef.current = rec;
    rec.start();
    setIsListening(true);
  };

  const handleExportPDF = () => {
    if (!activeChat) return;
    exportChatAsPDF(activeChat);
  };

  const handleSuggestedPrompt = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const messages = activeChat?.messages || [];
  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#07070a' }}>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 h-full z-50 md:hidden"
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#09090e' }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setSidebarOpen(true)}>
              <Menu size={18} color="#94a3b8" />
            </button>
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                {activeChat?.title || 'AuraBot AI Assistant'}
              </h2>
              <div className="text-[10px] font-semibold flex items-center gap-1.5 mt-0.5" style={{ color: '#64748b' }}>
                {isLoading ? (
                  <span className="text-indigo-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block animate-ping" />
                    Generating response...
                  </span>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" style={{ boxShadow: '0 0 6px #4ade80' }} />
                    Online &middot; <span className="text-purple-400 font-bold">{activeModel}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeChat && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleExportPDF}
                  className="p-2 rounded-xl text-xs flex items-center gap-1 transition-all glass-cyber hover:bg-white/5"
                  style={{ color: '#94a3b8' }}
                  title="Export as PDF"
                >
                  <Download size={14} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => clearChat(activeChatId)}
                  className="p-2 rounded-xl transition-all glass-cyber hover:bg-red-500/10 hover:border-red-500/25"
                  style={{ color: '#94a3b8' }}
                  title="Clear chat"
                >
                  <Trash2 size={14} />
                </motion.button>
              </>
            )}
            <div className="w-8.5 h-8.5 rounded-xl flex items-center justify-center text-xs font-black select-none shadow-md"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4">
          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full px-6 text-center select-none"
            >
              {/* Floating modern illustration */}
              <div className="w-20 h-20 rounded-3xl mb-6 flex items-center justify-center float-animation relative"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 20px 60px rgba(99,102,241,0.45)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                <Sparkles size={34} color="white" />
                <div className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-cyan-400 border-2 border-black flex items-center justify-center shadow-lg">
                  <span className="text-[7px] text-black font-extrabold font-mono">2.0</span>
                </div>
              </div>
              <h3 className="text-2xl font-black mb-1.5 gradient-text tracking-tight">How can I help you today?</h3>
              <p className="mb-8 text-xs font-semibold max-w-sm" style={{ color: '#94a3b8' }}>
                Ask me anything — coding, research, writing, analytics, or just have a conversation.
              </p>

              {/* Suggested Prompts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-2xl">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestedPrompt(prompt.text)}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl text-left transition-all glass-cyber glass-cyber-hover"
                    style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <span className="text-xl flex-shrink-0">{prompt.icon}</span>
                    <span className="text-[11px] font-bold leading-normal text-slate-300">{prompt.text}</span>
                    <ChevronRight size={12} className="ml-auto flex-shrink-0 text-slate-500" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {messages.map(msg => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              <AnimatePresence>
                {isLoading && <TypingIndicator />}
              </AnimatePresence>
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="px-6 py-5 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#09090e' }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3.5 p-3 rounded-2xl glass-cyber"
              style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              
              {/* Text Area */}
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message AuraBot... (Enter to send, Shift+Enter for new line)"
                rows={1}
                className="flex-1 resize-none outline-none bg-transparent text-xs font-semibold leading-relaxed"
                style={{ color: '#f8fafc', minHeight: 24, maxHeight: 120 }}
                onInput={e => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
              />

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Voice sound wave animation */}
                <AnimatePresence>
                  {isListening && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="voice-wave-container px-2 flex-shrink-0"
                    >
                      <div className="voice-wave-bar"></div>
                      <div className="voice-wave-bar"></div>
                      <div className="voice-wave-bar"></div>
                      <div className="voice-wave-bar"></div>
                      <div className="voice-wave-bar"></div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={handleVoice}
                  type="button"
                  className="p-2 rounded-xl transition-all border border-transparent"
                  style={{
                    background: isListening ? 'rgba(239,68,68,0.15)' : 'transparent',
                    borderColor: isListening ? 'rgba(239,68,68,0.25)' : 'transparent',
                    color: isListening ? '#ef4444' : '#64748b',
                  }}
                  title="Voice input"
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  type="button"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl transition-all shadow-md"
                  style={{
                    background: input.trim() && !isLoading ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.02)',
                    color: input.trim() && !isLoading ? 'white' : '#475569',
                    cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <Send size={15} />
                </motion.button>
              </div>
            </div>
            <p className="text-center text-[10px] font-bold mt-2.5" style={{ color: '#475569' }}>
              AuraBot can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;