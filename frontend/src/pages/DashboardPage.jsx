import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BarChart2, MessageSquare, TrendingUp, Clock, Zap,
  User, LogOut, ChevronRight, Activity, Star
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';

const WEEKLY_DATA = [
  { day: 'Mon', messages: 12, queries: 8 },
  { day: 'Tue', messages: 24, queries: 18 },
  { day: 'Wed', messages: 8, queries: 5 },
  { day: 'Thu', messages: 31, queries: 22 },
  { day: 'Fri', messages: 19, queries: 14 },
  { day: 'Sat', messages: 42, queries: 30 },
  { day: 'Sun', messages: 15, queries: 11 },
];

const CATEGORY_DATA = [
  { name: 'Coding', value: 35, color: '#6366f1' },
  { name: 'Research', value: 25, color: '#8b5cf6' },
  { name: 'Writing', value: 20, color: '#06b6d4' },
  { name: 'Analytics', value: 15, color: '#10b981' },
  { name: 'General', value: 5, color: '#f59e0b' },
];

const TOP_PROMPTS = [
  { prompt: 'Write Python code for...', count: 28, icon: '🐍' },
  { prompt: 'Explain machine learning...', count: 19, icon: '🤖' },
  { prompt: 'Analyze this data...', count: 15, icon: '📊' },
  { prompt: 'Write a report on...', count: 12, icon: '📝' },
  { prompt: 'Debug this error...', count: 9, icon: '🔧' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-4 py-2.5 rounded-xl text-xs font-semibold glass-cyber shadow-lg"
        style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#f8fafc' }}>
        <p className="mb-1.5 text-slate-400 font-bold">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="flex items-center gap-1.5" style={{ color: p.color }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: p.color }} />
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StatCard = ({ icon: Icon, label, value, change, color }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="p-5 rounded-2xl glass-cyber glass-cyber-hover"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner"
        style={{ background: `${color}15`, border: `1px solid ${color}35` }}>
        <Icon size={18} color={color} />
      </div>
      <span className="text-xs font-bold px-2 py-1 rounded-lg shadow-sm"
        style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
        {change}
      </span>
    </div>
    <p className="text-3xl font-black mb-1.5 text-slate-50">{value}</p>
    <p className="text-xs font-bold" style={{ color: '#94a3b8' }}>{label}</p>
  </motion.div>
);

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { chats } = useChat();
  const navigate = useNavigate();

  const totalMessages = chats.reduce((s, c) => s + c.messages.length, 0);
  const stats = [
    { icon: MessageSquare, label: 'Total Conversations', value: chats.length, change: '+12%', color: '#6366f1' },
    { icon: Activity, label: 'Messages Sent', value: totalMessages + 151, change: '+8%', color: '#8b5cf6' },
    { icon: Zap, label: 'Avg Response Time', value: '1.2s', change: '-5%', color: '#06b6d4' },
    { icon: TrendingUp, label: 'Queries This Week', value: 108, change: '+23%', color: '#10b981' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#07070a' }}>
      {/* Top Nav */}
      <div className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(7,7,10,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 12px rgba(99,102,241,0.3)' }}>
            <span className="text-white text-xs">A</span>
          </div>
          <span className="font-extrabold tracking-tight gradient-text">AuraBot Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/chat')}
            className="btn-primary text-xs px-4 py-2 flex items-center gap-2 font-bold shadow-md"
          >
            <MessageSquare size={14} />
            Open Chat
          </motion.button>
          <button onClick={logout} className="p-2.5 rounded-xl transition-all duration-300 glass-cyber hover:bg-red-500/10 hover:border-red-500/30"
            style={{ color: '#94a3b8' }} title="Log out">
            <LogOut size={15} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black mb-1 text-slate-50 tracking-tight">
              Welcome back, <span className="gradient-text font-black">{user?.name || 'User'}</span> 👋
            </h1>
            <p className="text-sm font-semibold" style={{ color: '#94a3b8' }}>
              Here's your AI usage overview for this week
            </p>
          </div>
          <a href="https://github.com/Surajchauhan27" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 self-start md:self-auto glass-cyber"
            style={{ borderColor: 'rgba(99,102,241,0.25)', textDecoration: 'none' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>SC</div>
            <div>
              <p className="text-xs font-bold text-slate-50">Suraj Chauhan</p>
              <p className="text-[10px] font-bold flex items-center gap-1" style={{ color: '#a78bfa' }}>
                Creator & Developer <Star size={8} fill="#f59e0b" color="#f59e0b" />
              </p>
            </div>
          </a>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5 }}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}
            className="lg:col-span-2 p-6 rounded-2xl glass-cyber"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-50" style={{ fontSize: '15px' }}>Weekly Activity</h3>
                <p className="text-xs font-semibold" style={{ color: '#94a3b8' }}>Messages and queries over 7 days</p>
              </div>
              <BarChart2 size={18} className="text-indigo-400" />
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={WEEKLY_DATA}>
                <defs>
                  <linearGradient id="msgGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="qryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="messages" name="Messages" stroke="#6366f1" fill="url(#msgGrad)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="queries" name="Queries" stroke="#06b6d4" fill="url(#qryGrad)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
            className="p-6 rounded-2xl glass-cyber"
          >
            <div className="mb-4">
              <h3 className="font-bold text-slate-50" style={{ fontSize: '15px' }}>Query Categories</h3>
              <p className="text-xs font-semibold" style={{ color: '#94a3b8' }}>Breakdown by type</p>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={60}
                  dataKey="value" stroke="none">
                  {CATEGORY_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: 'rgba(12,12,20,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#f8fafc', fontSize: 11, fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5 mt-2">
              {CATEGORY_DATA.map((cat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                    <span className="text-xs font-semibold" style={{ color: '#94a3b8' }}>{cat.name}</span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-50">{cat.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Prompts */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
            className="p-6 rounded-2xl glass-cyber"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-50" style={{ fontSize: '15px' }}>Most Used Prompts</h3>
              <Zap size={16} className="text-yellow-400" />
            </div>
            <div className="space-y-4">
              {TOP_PROMPTS.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-lg flex-shrink-0">{p.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-slate-200">{p.prompt}</p>
                    <div className="h-1.5 rounded-full mt-1.5 overflow-hidden" style={{ background: '#171725' }}>
                      <div className="h-full rounded-full"
                        style={{ width: `${(p.count / 30) * 100}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
                    </div>
                  </div>
                  <span className="text-xs font-extrabold flex-shrink-0" style={{ color: '#64748b' }}>{p.count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Conversations */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}
            className="p-6 rounded-2xl glass-cyber"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-50" style={{ fontSize: '15px' }}>Recent Conversations</h3>
              <Clock size={16} className="text-cyan-400" />
            </div>
            <div className="space-y-3">
              {chats.slice(0, 4).map((chat, i) => (
                <div key={i}
                  onClick={() => navigate('/chat')}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/5"
                  style={{ background: 'rgba(255,255,255,0.015)' }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(99,102,241,0.12)', color: '#6366f1' }}>
                    <MessageSquare size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-slate-200">{chat.title}</p>
                    <p className="text-[10px] font-semibold" style={{ color: '#64748b' }}>{chat.messages.length} messages</p>
                  </div>
                  <ChevronRight size={14} style={{ color: '#64748b' }} />
                </div>
              ))}
              {chats.length === 0 && (
                <div className="text-center py-6" style={{ color: '#64748b' }}>
                  <MessageSquare size={24} className="mx-auto mb-2 opacity-20" />
                  <p className="text-xs font-semibold">No conversations yet</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;