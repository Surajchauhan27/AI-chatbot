# 🤖 AuraBot — Smart AI Assistant

> A premium, production-ready, full-stack AI chatbot platform engineered with a glassmorphic React frontend, an Express.js server, and Google Gemini API integration.

---

## 💡 What Problem It Solves

Traditional conversational interfaces are often monolithic, slow, and completely disjointed from telemetry. Users looking to leverage conversational AI in specialized domains (like coding, analytics, and writing) need a unified workspace where they can:
1. **Analyze telemetry instantly**: Track conversational volume, message frequency, and response latency inside an integrated usage dashboard.
2. **Interact hands-free**: Utilize highly responsive speech-to-text processing for fluent voice messaging.
3. **Capture and share knowledge**: Export multi-turn chat sessions into professionally formatted PDF reports for collaborative reviews.
4. **Operate securely**: Maintain conversations under a robust JWT-based credentials framework.

---

## 🛠️ Technologies Used

### Frontend (UI/UX)
* **React 18 & Vite 5**: Powers the core reactive component lifecycle for ultra-fast, hot-reloading development.
* **Tailwind CSS v4**: Implements utility styling utilizing the latest state-of-the-art framework configurations.
* **Framer Motion 12**: Delivers premium visual transitions, floating illustration nodes, and smooth spring animations.
* **Recharts**: Builds gorgeous, interactive data visualizations (Area and Pie telemetry) with custom tooltips.
* **jsPDF**: Generates professional PDF document templates for client-side chat history downloads.

### Backend (API Services)
* **Node.js & Express 5**: Structures a high-throughput, low-latency RESTful API gateway.
* **Google Gemini AI SDK**: Connects with advanced LLM models (e.g. Gemini 2.0 Flash) to yield rich AI context.
* **JWT & bcryptjs**: Handles secure session hashing and user token verification.

---

## ✨ Features & Chatbot Workflow

### 🚀 Key Technical Highlights (Action + Tool/Tech + Result/Feature)
* **Integrated** Google Gemini API using an Express.js gateway to supply a **low-latency conversational AI assistant** capable of rich multi-turn context.
* **Developed** a responsive React 18 SPA styled with Tailwind CSS v4 to deliver an **ultra-premium, glassmorphic UI** that transitions flawlessly across device screens.
* **Engineered** speech recognition states with the Web Speech API to provide an **interactive hands-free voice input workflow** enhanced by a pulsing audio-wave indicator.
* **Constructed** graphical telemetry widgets using Recharts to present **real-time AI usage data analytics** on a beautiful visual dashboard.
* **Designed** custom rich-text parser modules in React to render **gorgeous markdown conversations** complete with copyable developer code consoles.
* **Created** an client-side document compiler using jsPDF to enable **one-click conversation exports** into clean, styled PDF reports.

---

## 📂 Project Structure

```text
AuraBot26/
├── frontend/                  # React + Vite + Tailwind CSS (SPA)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInterface.jsx   # Interactive workspace with voice wave
│   │   │   ├── MessageBubble.jsx   # Markdown parser + copyable code console
│   │   │   ├── Sidebar.jsx         # Frosted glass conversation indexer
│   │   │   ├── CreatorProfile.jsx  # Interactive portfolio modal
│   │   │   ├── ProtectedRoute.jsx  # Route access controller
│   │   │   └── TypingIndicator.jsx # Animated loading feedback
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx     # Marketing home screen
│   │   │   ├── DashboardPage.jsx   # Telemetry charts + stats
│   │   │   ├── LoginPage.jsx       # Frosted login panel
│   │   │   └── SignupPage.jsx      # Credential register with pass strength
│   │   ├── context/
│   │   │   ├── AuthContext.jsx     # Session state manager
│   │   │   └── ChatContext.jsx     # Conversation API orchestrator
│   │   └── utils/
│   │       └── pdfExport.js        # PDF compilation utility
│   ├── index.html
│   └── vite.config.js
│
└── backend/                   # Node.js + Express API Server
    ├── routes/
    │   ├── auth.js             # JWT user endpoints
    │   ├── chat.js             # Gemini AI middleware router
    │   └── chats.js            # History storage manager
    ├── server.js               # Application entrypoint
    └── .env                    # Secret environment key configurations
```

---

## 🌐 Deployment

### 1. Frontend (Vercel)
AuraBot is optimized for easy deployment to static hosting platforms like Vercel.

```bash
cd frontend
npm run build
# Deploy the generated dist/ folder directly.
```

Include a `vercel.json` rewrite in the `frontend` root to ensure correct single-page client routing:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 2. Backend (Render / Railway)
1. Link your backend subfolder or full repository to a cloud container runtime like Render or Railway.
2. In your host environment dashboard, declare the following environment variables:
   * `GEMINI_API_KEY` (Your Google API key)
   * `JWT_SECRET` (Secure key to sign user tokens)
   * `NODE_ENV=production`

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- A Google Gemini API Key (Get a free key from [Google AI Studio](https://aistudio.google.com/))

### 1. Clone & Install
```bash
git clone https://github.com/your-username/Built-an-AI-chatbot.git
cd Built-an-AI-chatbot

# Install frontend modules
cd frontend && npm install

# Install backend modules
cd ../backend && npm install
```

### 2. Add Secrets
Create a `.env` file in the `backend` folder and add your credentials:
```env
PORT=5000
GEMINI_API_KEY=AIzaSy...
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Run Dev Server
**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
Open **`http://localhost:3000`** and enjoy AuraBot! 🎉

---

## 🏆 Demo Mode
No API key? No problem! Click **"Try Demo"** on the login screen to experience the complete app using mocked credentials:
* **Email**: `demo@aurabot.ai`
* **Password**: `demo123`

---

## 📄 License
This project is licensed under the MIT License — feel free to customize it for your developer portfolio!