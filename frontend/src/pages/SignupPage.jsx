import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const PasswordStrength = ({ password }) => {
  const checks = [
    { label: '8+ chars', pass: password.length >= 8 },
    { label: 'Uppercase', pass: /[A-Z]/.test(password) },
    { label: 'Number', pass: /[0-9]/.test(password) },
    { label: 'Special', pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const colors = ['#ef4444', '#f59e0b', '#10b981', '#6366f1'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];

  if (!password) return null;

  return (
    <div className="mt-2.5">
      <div className="flex gap-1 mb-1.5">
        {checks.map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: i < score ? colors[score - 1] : 'rgba(255,255,255,0.06)' }} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold" style={{ color: score > 0 ? colors[score - 1] : '#64748b' }}>
          {score > 0 ? labels[score - 1] : ''}
        </span>
        <div className="flex gap-2">
          {checks.map((c, i) => (
            <span key={i} className="text-[10px] font-bold flex items-center gap-0.5"
              style={{ color: c.pass ? '#10b981' : '#64748b' }}>
              {c.pass && <CheckCircle size={10} />}
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    const API_URL = import.meta.env.VITE_API_URL || '';
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/signup`, { name: form.name, email: form.email, password: form.password });
      login({ name: form.name, email: form.email, token: data.token });
      toast.success(`Welcome to AuraBot, ${form.name}! 🎉`);
      navigate('/chat');
    } catch (err) {
      const msg = err.response?.data?.error || 'Signup failed. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    login({ name: 'Demo User', email: 'demo@aurabot.ai', token: 'demo-token' });
    toast.success('Welcome to AuraBot! 🎉');
    navigate('/chat');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{ background: '#07070a' }}>
      {/* Background glowing particles */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 15px rgba(99,102,241,0.4)' }}>
              <span className="text-white">A</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight gradient-text">AuraBot</span>
          </Link>
          <h1 className="text-3xl font-black mb-1.5 text-slate-50 tracking-tight">Create your account</h1>
          <p className="text-sm font-semibold" style={{ color: '#94a3b8' }}>Join thousands of professionals using AI to work smarter</p>
        </div>

        {/* Card */}
        <div className="glass-cyber rounded-3xl p-8 relative overflow-hidden">
          {/* Demo Button */}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleDemoLogin}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl mb-6 font-bold text-sm transition-all shadow-md"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
              border: '1px solid rgba(99,102,241,0.3)',
              color: '#c7d2fe',
            }}
          >
            <Sparkles size={16} className="text-indigo-400" />
            Try Demo — No Signup Required
          </motion.button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#475569' }}>or create account</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: '#64748b' }}>Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 rounded-xl outline-none text-sm font-semibold transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: '#f8fafc',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(99,102,241,0.5)';
                    e.target.style.background = 'rgba(255,255,255,0.04)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.target.style.background = 'rgba(255,255,255,0.02)';
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: '#64748b' }}>Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl outline-none text-sm font-semibold transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: '#f8fafc',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(99,102,241,0.5)';
                    e.target.style.background = 'rgba(255,255,255,0.04)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.target.style.background = 'rgba(255,255,255,0.02)';
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: '#64748b' }}>Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input
                  id="signup-password"
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl outline-none text-sm font-semibold transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: '#f8fafc',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(99,102,241,0.5)';
                    e.target.style.background = 'rgba(255,255,255,0.04)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.target.style.background = 'rgba(255,255,255,0.02)';
                  }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity">
                  {showPass ? <EyeOff size={15} color="#64748b" /> : <Eye size={15} color="#64748b" />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: '#64748b' }}>Confirm Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                <input
                  id="signup-confirm"
                  type={showPass ? 'text' : 'password'}
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl outline-none text-sm font-semibold transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${form.confirm && form.password !== form.confirm ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.06)'}`,
                    color: '#f8fafc',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = form.confirm && form.password !== form.confirm ? 'rgba(239,68,68,0.5)' : 'rgba(99,102,241,0.5)';
                    e.target.style.background = 'rgba(255,255,255,0.04)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = form.confirm && form.password !== form.confirm ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.06)';
                    e.target.style.background = 'rgba(255,255,255,0.02)';
                  }}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3.5 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}
              >
                <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                <span className="text-xs font-semibold text-red-400 leading-normal">{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-sm font-bold shadow-md"
            >
              {loading ? (
                <div className="flex gap-1">
                  <div className="typing-dot" style={{ width: 6, height: 6, background: '#fff' }} />
                  <div className="typing-dot" style={{ width: 6, height: 6, background: '#fff' }} />
                  <div className="typing-dot" style={{ width: 6, height: 6, background: '#fff' }} />
                </div>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm mt-6 font-semibold" style={{ color: '#64748b' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;