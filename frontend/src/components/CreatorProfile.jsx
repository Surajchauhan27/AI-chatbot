import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitFork, Link2, Code, BarChart2, Database,
  Brain, X, ExternalLink, Award, Zap, Star
} from 'lucide-react';

const SKILLS = [
  { name: 'Python', color: '#3b82f6' },
  { name: 'SQL', color: '#8b5cf6' },
  { name: 'Power BI', color: '#f59e0b' },
  { name: 'Pandas', color: '#10b981' },
  { name: 'NumPy', color: '#06b6d4' },
  { name: 'React.js', color: '#6366f1' },
  { name: 'Node.js', color: '#22c55e' },
  { name: 'Tailwind CSS', color: '#0ea5e9' },
  { name: 'GitHub', color: '#a855f7' },
  { name: 'Data Viz', color: '#ef4444' },
  { name: 'ETL', color: '#f97316' },
  { name: 'AI Apps', color: '#ec4899' },
];

const EXPERTISE = [
  { icon: BarChart2, label: 'Data Analysis', color: '#6366f1' },
  { icon: Database, label: 'Power BI Dev', color: '#f59e0b' },
  { icon: Code, label: 'Full Stack', color: '#10b981' },
  { icon: Brain, label: 'AI / ML', color: '#8b5cf6' },
];

const CreatorProfile = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      transition={{ type: 'spring', damping: 25 }}
      onClick={e => e.stopPropagation()}
      className="w-full max-w-lg rounded-3xl overflow-hidden relative glass-cyber shadow-2xl"
      style={{ maxHeight: '90vh', overflowY: 'auto', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      {/* Header Banner */}
      <div className="relative h-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)' }}>
        <div className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        <button onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center transition-all bg-black/25 hover:bg-black/40 border border-white/10"
          title="Close profile">
          <X size={15} color="white" />
        </button>
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 rounded-2xl border-4 flex items-center justify-center text-3xl font-black text-white"
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              borderColor: '#0a0a0f',
              boxShadow: '0 8px 25px rgba(99,102,241,0.5)',
            }}>
            SC
          </div>
        </div>
      </div>

      <div className="pt-14 px-6 pb-6 select-none">
        {/* Name + Title */}
        <div className="mb-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-50 tracking-tight">Suraj Chauhan</h2>
              <p className="text-xs mt-1.5 font-semibold leading-relaxed" style={{ color: '#a78bfa' }}>
                Data Analyst • Research Analyst • AI Enthusiast • Power BI Developer
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl glass-cyber"
              style={{ borderColor: 'rgba(99,102,241,0.3)' }}>
              <Star size={10} fill="#f59e0b" color="#f59e0b" />
              <span className="text-[10px] font-bold text-indigo-300">Creator</span>
            </div>
          </div>

          {/* Mission */}
          <div className="mt-4.5 p-3.5 rounded-2xl glass-cyber"
            style={{ background: 'rgba(99,102,241,0.06)', borderColor: 'rgba(99,102,241,0.15)' }}>
            <p className="text-xs italic leading-relaxed text-slate-300 font-semibold">
              "My goal is to build smart, user-friendly, and data-driven applications that solve
              real-world problems while continuously improving my technical and analytical skills."
            </p>
          </div>
        </div>

        {/* Expertise */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {EXPERTISE.map((e, i) => {
            const Icon = e.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex flex-col items-center gap-2 p-2.5 rounded-2xl text-center glass-cyber"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-inner"
                  style={{ background: `${e.color}15`, border: `1px solid ${e.color}25` }}>
                  <Icon size={15} color={e.color} />
                </div>
                <span className="text-[10px] font-bold leading-tight" style={{ color: '#94a3b8' }}>{e.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* About */}
        <div className="mb-5">
          <h3 className="text-[10px] font-bold uppercase mb-2 flex items-center gap-1.5 tracking-wider"
            style={{ color: '#475569' }}>
            <Award size={12} className="text-indigo-400" /> About
          </h3>
          <p className="text-xs leading-relaxed font-semibold text-slate-300">
            Suraj Chauhan is a BCA graduate focused on analytics, AI tools, and business intelligence
            solutions. He enjoys building interactive dashboards, automation tools, and modern
            AI-powered web applications that improve decision-making and user experience.
          </p>
        </div>

        {/* Skills */}
        <div className="mb-5">
          <h3 className="text-[10px] font-bold uppercase mb-3 flex items-center gap-1.5 tracking-wider"
            style={{ color: '#475569' }}>
            <Zap size={12} className="text-yellow-400" /> Skills & Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.1 }}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-default shadow-sm"
                style={{
                  background: `${skill.color}12`,
                  border: `1px solid ${skill.color}35`,
                  color: skill.color,
                }}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <a
            href="https://github.com/Surajchauhan27"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md"
              style={{
                background: 'rgba(168,85,247,0.12)',
                border: '1px solid rgba(168,85,247,0.25)',
                color: '#c084fc',
              }}
            >
              <GitFork size={15} />
              GitHub
              <ExternalLink size={12} />
            </motion.div>
          </a>
          <a
            href="https://linkedin.com/in/codewithsuraj"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md"
              style={{
                background: 'rgba(6,182,212,0.12)',
                border: '1px solid rgba(6,182,212,0.25)',
                color: '#22d3ee',
              }}
            >
              <Link2 size={15} />
              LinkedIn
              <ExternalLink size={12} />
            </motion.div>
          </a>
        </div>

        {/* Footer */}
        <div className="mt-5 text-center">
          <p className="text-[10px] font-bold" style={{ color: '#475569' }}>
            🤖 AuraBot was designed and developed by{' '}
            <span className="font-extrabold text-indigo-400">Suraj Chauhan</span>
            {' '}© 2026
          </p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// Small creator badge for sidebar footer
export const CreatorBadge = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-2.5 p-3 rounded-xl transition-all"
        style={{
          background: 'rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.15)',
        }}
      >
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
          SC
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-xs font-bold truncate text-slate-100">Suraj Chauhan</p>
          <p className="text-[10px] font-bold truncate" style={{ color: '#64748b' }}>Creator & Developer</p>
        </div>
        <Star size={11} fill="#f59e0b" color="#f59e0b" />
      </motion.button>

      <AnimatePresence>
        {open && <CreatorProfile onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default CreatorProfile;