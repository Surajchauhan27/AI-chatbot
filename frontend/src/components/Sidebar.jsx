import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, MessageSquare, Trash2,
  Code, BookOpen, PenTool, BarChart2, Layers, Hash
} from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { CreatorBadge } from './CreatorProfile';

const CATEGORIES = [
  { id: 'all', label: 'All Chats', icon: Layers },
  { id: 'coding', label: 'Coding', icon: Code },
  { id: 'research', label: 'Research', icon: BookOpen },
  { id: 'writing', label: 'Writing', icon: PenTool },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'general', label: 'General', icon: Hash },
];

const Sidebar = ({ onClose }) => {
  const {
    filteredChats, activeChatId, setActiveChatId, createNewChat,
    deleteChat, searchQuery, setSearchQuery, activeCategory, setActiveCategory,
  } = useChat();

  const [deletingId, setDeletingId] = useState(null);

  const handleNewChat = () => {
    createNewChat();
    onClose?.();
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    onClose?.();
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setDeletingId(id);
    setTimeout(() => {
      deleteChat(id);
      setDeletingId(null);
    }, 300);
  };

  const timeAgo = (iso) => {
    const diff = Date.now() - new Date(iso).getTime();
    const h = Math.floor(diff / 3600000);
    const d = Math.floor(diff / 86400000);
    if (d > 0) return `${d}d ago`;
    if (h > 0) return `${h}h ago`;
    return 'Just now';
  };

  const getCategoryIcon = (cat) => {
    const found = CATEGORIES.find(c => c.id === cat);
    const Icon = found?.icon || Hash;
    return <Icon size={12} />;
  };

  return (
    <div
      className="flex flex-col h-full select-none"
      style={{ background: '#09090e', borderRight: '1px solid rgba(255,255,255,0.05)', width: 280 }}
    >
      {/* Header */}
      <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 10px rgba(99,102,241,0.3)' }}>
          <span className="text-white text-xs">A</span>
        </div>
        <span className="font-extrabold text-base tracking-tight gradient-text">AuraBot</span>
        <div className="ml-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 pulse-glow" />
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewChat}
          className="w-full btn-primary flex items-center gap-2 justify-center text-sm py-2.5 font-bold shadow-md"
        >
          <Plus size={16} />
          New Conversation
        </motion.button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs font-semibold outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: '#f8fafc',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.3)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-3 pb-3">
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-all shadow-sm"
                style={{
                  background: isActive ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.05)'}`,
                  color: isActive ? '#818cf8' : '#94a3b8',
                }}
              >
                <Icon size={10} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        <div className="text-[10px] font-bold mb-2 px-2 uppercase tracking-wider" style={{ color: '#475569' }}>
          Recent Conversations
        </div>
        <div className="space-y-1">
          <AnimatePresence>
            {filteredChats.length === 0 ? (
              <div className="text-center py-10" style={{ color: '#64748b' }}>
                <MessageSquare size={20} className="mx-auto mb-2.5 opacity-20" />
                <p className="text-[11px] font-bold">No chats found</p>
              </div>
            ) : (
              filteredChats.map(chat => {
                const isActive = activeChatId === chat.id;
                return (
                  <motion.div
                    key={chat.id}
                    layout
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: deletingId === chat.id ? 0 : 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => handleSelectChat(chat.id)}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all border border-transparent"
                    style={{
                      background: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
                      borderColor: isActive ? 'rgba(99,102,241,0.2)' : 'transparent',
                    }}
                  >
                    <div className="w-7.5 h-7.5 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isActive ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.04)',
                        color: '#6366f1'
                      }}>
                      {getCategoryIcon(chat.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color: isActive ? '#f8fafc' : '#cbd5e1' }}>
                        {chat.title}
                      </p>
                      <p className="text-[10px] font-semibold mt-0.5" style={{ color: '#64748b' }}>
                        {chat.messages.length} msgs • {timeAgo(chat.createdAt)}
                      </p>
                    </div>
                    <button
                      onClick={e => handleDelete(e, chat.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10 hover:border-red-500/25 border border-transparent transition-all"
                      title="Delete conversation"
                    >
                      <Trash2 size={12} className="text-red-400" />
                    </button>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Creator Badge at the bottom */}
      <div className="p-3 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <CreatorBadge />
      </div>
    </div>
  );
};

export default Sidebar;