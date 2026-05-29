const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const frontendUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, '') : null;
    const allowed = [
      'http://localhost:3000',
      'http://localhost:5173',
      frontendUrl,
      'https://ai-chatbot2k.netlify.app'
    ].filter(Boolean);

    if (allowed.includes(origin) || origin.endsWith('netlify.app') || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/chats', require('./routes/chats'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0', model: 'gemini-2.0-flash' });
});

app.listen(PORT, () => {
  console.log(`\n≡ƒÜÇ AuraBot Backend running on http://localhost:${PORT}`);
  console.log(`≡ƒôí Gemini API: ${process.env.GEMINI_API_KEY ? 'Γ£à Connected' : 'ΓÜá∩╕Å  No API key ΓÇô set GEMINI_API_KEY in .env'}`);
  console.log(`≡ƒöÉ JWT Secret: ${process.env.JWT_SECRET ? 'Γ£à Set' : 'ΓÜá∩╕Å  Using default (change in production)'}\n`);
});