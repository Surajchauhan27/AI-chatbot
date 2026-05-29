import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, User, Sparkles } from 'lucide-react';

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-2xl overflow-hidden glass-cyber shadow-lg" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="px-4 py-2 flex justify-between items-center bg-black/40 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}>
        <span className="text-[10px] font-bold uppercase tracking-wider font-mono">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] font-bold hover:text-slate-100 transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded-lg border border-white/5 transition-all"
        >
          {copied ? (
            <>
              <Check size={11} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={11} />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed" style={{ color: '#cbd5e1', background: 'rgba(7,7,10,0.4)' }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const formatContent = (content) => {
  const lines = content.split('\n');
  const elements = [];
  let inCode = false;
  let codeLines = [];
  let codeLang = '';
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (!inCode) {
        inCode = true;
        codeLang = line.slice(3).trim();
        codeLines = [];
      } else {
        elements.push(
          <CodeBlock key={key++} code={codeLines.join('\n')} language={codeLang} />
        );
        inCode = false;
        codeLines = [];
        codeLang = '';
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (line.startsWith('# ')) {
      elements.push(<h1 key={key++} className="text-xl font-extrabold mb-3 mt-4 text-slate-50 tracking-tight">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-lg font-extrabold mb-2.5 mt-4 text-slate-100 tracking-tight">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-sm font-bold mb-2 mt-3 text-slate-200">{line.slice(4)}</h3>);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <li key={key++} className="ml-5 mb-1.5 text-xs font-semibold leading-relaxed text-slate-300" style={{ listStyleType: 'disc' }}>
          {formatInline(line.slice(2))}
        </li>
      );
    } else if (/^\d+\.\s/.test(line)) {
      elements.push(
        <li key={key++} className="ml-5 mb-1.5 text-xs font-semibold leading-relaxed text-slate-300" style={{ listStyleType: 'decimal' }}>
          {formatInline(line.replace(/^\d+\.\s/, ''))}
        </li>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="mb-2 text-xs font-semibold leading-relaxed text-slate-300">
          {formatInline(line)}
        </p>
      );
    }
  }

  return elements;
};

const formatInline = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-slate-50">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="px-1.5 py-0.5 rounded-lg text-[10px] font-mono font-bold" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#22d3ee' }}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

const MessageBubble = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const timeStr = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-start gap-3.5 px-6 py-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`w-8.5 h-8.5 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
        isUser
          ? 'bg-gradient-to-br from-cyan-500 to-indigo-500 shadow-cyan-500/10'
          : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/10'
      }`}
        style={{ border: '1px solid rgba(255,255,255,0.1)' }}
      >
        {isUser ? (
          <User size={14} className="text-white" />
        ) : (
          <Sparkles size={14} className="text-white float-animation" />
        )}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
        <div className={`px-4.5 py-3.5 ${isUser ? 'message-bubble-user' : 'message-bubble-ai'} ${isUser ? 'slide-in-right' : 'slide-in-left'}`}>
          {isUser ? (
            <p className="text-xs text-white leading-relaxed font-semibold">{message.content}</p>
          ) : (
            <div className="leading-relaxed">{formatContent(message.content)}</div>
          )}
        </div>

        {/* Timestamp + Copy */}
        <div className={`flex items-center gap-2.5 transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'} ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-[10px] font-bold text-slate-500">{timeStr}</span>
          <button
            onClick={handleCopy}
            className="p-1 rounded-lg bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
            title="Copy message"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Check size={11} className="text-green-400" />
                </motion.div>
              ) : (
                <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Copy size={11} className="text-slate-500 hover:text-slate-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;