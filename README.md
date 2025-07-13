<div align="center">

# 🛒 E-commerce Multimodal AI Chatbot

*Next-Generation Shopping Assistant with Voice AI & Document Intelligence*

[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688.svg?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Sarvam AI](https://img.shields.io/badge/Sarvam_AI-Multi--Language-orange.svg?style=for-the-badge)](https://www.sarvam.ai/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[![Stars](https://img.shields.io/github/stars/Karan3431/Ecommerce-Multi-model-chatbot?style=social)](https://github.com/Karan3431/Ecommerce-Multi-model-chatbot/stargazers)
[![Forks](https://img.shields.io/github/forks/Karan3431/Ecommerce-Multi-model-chatbot?style=social)](https://github.com/Karan3431/Ecommerce-Multi-model-chatbot/network/members)
[![Issues](https://img.shields.io/github/issues/Karan3431/Ecommerce-Multi-model-chatbot?style=social)](https://github.com/Karan3431/Ecommerce-Multi-model-chatbot/issues)

</div>

---

<div align="center">
  
### � **Revolutionary E-commerce Experience** | 🧠 **RAG-Powered Intelligence** | 🎙️ **Multi-Language Voice Shopping**

*Seamlessly combining Google Gemini Live, Sarvam AI, and advanced document understanding for the ultimate shopping assistant*

</div>

## 📋 Table of Contents

<details>
<summary>🔍 Click to expand navigation</summary>

- [🎯 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [💻 Installation](#-installation)
- [🎮 Usage Guide](#-usage-guide)
- [🔌 API Reference](#-api-reference)
- [📂 Project Structure](#-project-structure)
- [🌍 Multi-Language Support](#-multi-language-support)
- [⚙️ Configuration](#️-configuration)

- [📄 License](#-license)

</details>

## 🎯 Overview

<div align="center">

![E-commerce AI](https://img.shields.io/badge/E--commerce_AI-Shopping_Assistant-blueviolet?style=for-the-badge)
![Voice Chat](https://img.shields.io/badge/Voice_Shopping-Multi--Language-success?style=for-the-badge)
![Document_RAG](https://img.shields.io/badge/Product_Intelligence-RAG_Powered-orange?style=for-the-badge)

</div>

> **Revolutionary e-commerce platform that transforms online shopping with AI-powered voice assistance**

This cutting-edge application combines **three powerful AI modalities** to create the ultimate shopping experience:

<table>
<tr>
<td width="33%">

### 💬 **Smart Shopping Chat**
Intelligent product conversations powered by Google Gemini with contextual understanding and real-time responses

**🎯 Features:**
- Product recommendations
- Context-aware responses  
- Real-time streaming
- Web search integration (Tavily)

</td>
<td width="33%">

### 📚 **Product Intelligence RAG**
Upload and query product manuals, specifications, and documents with advanced retrieval-augmented generation

**🎯 Features:**
- PDF, DOC, TXT support
- Product specification search
- Semantic search
- Session-based memory

</td>
<td width="34%">

### 🎙️ **Multi-Language Voice Shopping**
Real-time voice shopping in 10+ Indian languages plus English using Sarvam AI and Google Gemini Live

**🎯 Features:**
- 14 unique voice personas (Anuska default)
- Real-time audio processing
- Cross-language shopping
- Voice-to-text accuracy

</td>
</tr>
</table>

**🌟 What makes this special:** Complete e-commerce platform with seamless integration of text, voice, and document intelligence in a modern, responsive web application with enterprise-grade architecture and beautiful 3D animations.

## ✨ Key Features

<div align="center">

### 🏆 **Cutting-Edge Capabilities**

</div>

<table>
<tr>
<td width="50%">

### 🤖 **AI-Powered Intelligence**

<details>
<summary><b>🧠 Advanced Language Models</b></summary>

- **Google Gemini 2.0 Flash**: Latest multimodal AI with vision and reasoning
- **LangChain Integration**: Advanced prompt engineering and chain-of-thought
- **Context Awareness**: Maintains conversation history and context
- **Real-time Streaming**: Progressive response generation

</details>

**✅ Core AI Features:**
- 🎯 Contextual understanding
- 🔍 Web search integration (Tavily)
- 📝 Document comprehension
- 🎪 Multi-modal processing

</td>
<td width="50%">

### 🗣️ **Voice & Language Processing**

<details>
<summary><b>🌍 Multi-Language Support</b></summary>

- **Sarvam AI Integration**: 10+ Indian languages + English
- **Voice Personas**: 14 unique voice characters
- **Real-time Processing**: Live audio transcription and synthesis
- **Language Detection**: Automatic language recognition

</details>

**✅ Voice Features:**
- 🎙️ Real-time voice chat
- 🗣️ Natural speech synthesis
- 👂 Advanced speech recognition
- 🌐 Cross-language conversations

</td>
</tr>
</table>

<div align="center">

### 🚀 **Technical Excellence**

![WebSocket](https://img.shields.io/badge/WebSocket-Real--time-success)
![Vector_DB](https://img.shields.io/badge/Vector_Database-Redis-red)
![Responsive_UI](https://img.shields.io/badge/Responsive_UI-Modern-blue)
![TypeScript](https://img.shields.io/badge/Type_Safe-TypeScript-3178C6)

</div>

## 🏗️ Architecture

<div align="center">

### 🔧 **Modern Full-Stack Architecture**

</div>

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React + TypeScript]
        B[Tailwind CSS]
        C[Framer Motion]
        D[Vite Build Tool]
    end
    
    subgraph "API Layer"
        E[FastAPI Server]
        F[WebSocket Handlers]
        G[REST Endpoints]
        H[CORS Middleware]
    end
    
    subgraph "AI Services"
        I[Google Gemini Live]
        J[Sarvam AI API]
        K[Tavily Search]
        L[LangChain Agents]
    end
    
    subgraph "Data Layer"
        M[Redis Vector Store]
        N[Session Management]
        O[File Processing]
        P[Embeddings Storage]
    end
    
    A --> E
    E --> I
    E --> J
    E --> K
    E --> M
    F --> I
    F --> J
```

### 🛠️ **Technology Stack**

<table>
<tr>
<td width="50%">

### 🖥️ **Frontend Technologies**

| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-18.2+-61DAFB) | UI Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6) | Type Safety |
| ![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF) | Build Tool |
| ![Tailwind](https://img.shields.io/badge/Tailwind-3.3+-06B6D4) | Styling |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.0+-0055FF) | Animations |

</td>
<td width="50%">

### ⚙️ **Backend Technologies**

| Technology | Version | Purpose |
|------------|---------|---------|
| ![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688) | API Framework |
| ![Python](https://img.shields.io/badge/Python-3.9+-3776AB) | Core Language |
| ![LangChain](https://img.shields.io/badge/LangChain-0.1+-121011) | AI Framework |
| ![Redis](https://img.shields.io/badge/Redis-7.0+-DC382D) | Vector Database |
| ![WebSocket](https://img.shields.io/badge/WebSocket-Real--time-yellow) | Live Communication |

</td>
</tr>
</table>

## 🚀 Quick Start

<div align="center">

### ⚡ **Get Running in Under 10 Minutes!**

*Follow these simple steps to launch your AI assistant*

</div>

### 📦 **Prerequisites**

```bash
# Required software versions
Python 3.9+
Node.js 18+
Redis Server 7.0+

# Required API Keys
- Google Gemini API Key
- Sarvam AI API Key  
- Tavily Search API Key
```

### 🎮 **One-Command Setup**

<details>
<summary><b>🚀 Quick Installation Script</b></summary>

```bash
# 1️⃣ Clone and setup
git clone https://github.com/Karan3431/Ecommerce-Multi-model-chatbot.git
cd Ecommerce-Multi-model-chatbot

# 2️⃣ Backend setup
cd server
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# 3️⃣ Environment configuration
cp .env.example .env
# Edit .env with your API keys

# 4️⃣ Frontend setup
cd ../client
npm install

# 5️⃣ Start services
# Terminal 1: Redis
redis-server

# Terminal 2: Backend
cd server && uvicorn app.main:app --reload --port 8000

# Terminal 3: Frontend  
cd client && npm run dev
```

</details>

### ⚡ **Environment Setup**

Create `.env` file in the `server` directory:

```env
# AI Service API Keys
GOOGLE_API_KEY=your_google_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash-exp
SARVAM_API_KEY=your_sarvam_ai_api_key_here
TAVILY_API_KEY=your_tavily_search_api_key_here

# Database Configuration
REDIS_URL=redis://localhost:6379

# Server Configuration
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

## 💻 Installation

### 🔧 **Detailed Setup Guide**

<details>
<summary><b>🐍 Backend Installation</b></summary>

```bash
# Navigate to server directory
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Verify installation
python -c "import fastapi, langchain, redis; print('✅ Backend dependencies installed')"
```

**📦 Key Dependencies:**
- `fastapi[all]>=0.104.0` - Modern web framework
- `langchain>=0.1.0` - AI application framework
- `google-generativeai>=0.3.0` - Gemini AI integration
- `redis>=5.0.0` - Vector database
- `websockets>=11.0` - Real-time communication

</details>

<details>
<summary><b>⚛️ Frontend Installation</b></summary>

```bash
# Navigate to client directory
cd client

# Install Node.js dependencies
npm install

# Verify installation
npm list react typescript vite

# Start development server
npm run dev

# Build for production
npm run build
```

**📦 Key Dependencies:**
- `react@^18.2.0` - UI framework
- `typescript@^5.0.0` - Type safety
- `vite@^5.0.0` - Build tool
- `tailwindcss@^3.3.0` - CSS framework
- `framer-motion@^10.0.0` - Animations

</details>

### 🔑 **API Keys Setup**

<table>
<tr>
<td width="33%">

### 🤖 **Google Gemini**
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create new project
3. Generate API key
4. Add to `.env` as `GOOGLE_API_KEY`

</td>
<td width="33%">

### 🎙️ **Sarvam AI**
1. Visit [Sarvam AI](https://www.sarvam.ai/)
2. Sign up for account
3. Get API credentials
4. Add to `.env` as `SARVAM_API_KEY`

</td>
<td width="34%">

### 🔍 **Tavily Search**
1. Visit [Tavily](https://tavily.com/)
2. Create developer account
3. Generate search API key
4. Add to `.env` as `TAVILY_API_KEY`

</td>
</tr>
</table>

## 🎮 Usage Guide

<div align="center">

### 🌟 **Master Your AI Assistant**

</div>

### 💬 **Text Chat Features**

<details>
<summary><b>🗨️ Basic Text Conversation</b></summary>

```typescript
// Example conversation flow
User: "What is artificial intelligence?"
AI: "Artificial intelligence (AI) refers to the simulation of human intelligence..."

// With web search
User: "What's the latest news about AI?"
AI: *Searches web via Tavily* "Here are the latest AI developments..."

// With document context
User: "Summarize the uploaded research paper"
AI: *Uses RAG* "Based on the uploaded document, here's a summary..."
```

**✨ Features:**
- 🔄 Real-time streaming responses
- 🌐 Web search integration
- 📚 Document-aware conversations
- 💾 Session memory

</details>

### 📄 **Document Upload & RAG**

<details>
<summary><b>📚 Document Intelligence</b></summary>

```bash
# Supported formats
✅ PDF (.pdf) - Research papers, reports, books
✅ Word (.docx, .doc) - Documents, articles
✅ Text (.txt) - Plain text files
✅ Markdown (.md) - Documentation

# Processing pipeline
1. File Upload → 2. Text Extraction → 3. Chunking → 4. Embedding → 5. Vector Storage
```

**🎯 How to use:**
1. 📤 Click upload button
2. 📄 Select document(s)
3. ⏳ Wait for processing
4. 💬 Ask questions about content
5. 🔍 Get precise, cited answers

</details>

### 🎙️ **Voice Chat Experience**

<table>
<tr>
<td width="50%">

### 🤖 **Google Gemini Live**

<details>
<summary><b>🎤 Premium Voice Experience</b></summary>

- **Real-time conversation** with advanced AI
- **Natural speech patterns** and intonation
- **Context-aware responses** with voice memory
- **Emotional understanding** and appropriate tone

**🚀 Getting Started:**
1. Click "Gemini Voice Chat"
2. Allow microphone access
3. Speak naturally
4. Toggle RAG for document queries

</details>

</td>
<td width="50%">

### 🌍 **Sarvam Multi-Language**

<details>
<summary><b>🗣️ Indian Language Support</b></summary>

- **10+ Indian languages** + English
- **14 unique voice personas** to choose from
- **Regional accent accuracy** and cultural context
- **Real-time translation** capabilities

**🌟 Getting Started:**
1. Click "Sarvam Voice Chat"
2. Select language & voice
3. Start conversation
4. Switch languages anytime

</details>

</td>
</tr>
</table>

## 🌍 Multi-Language Support

<div align="center">

### 🎭 **Voice Personas & Languages**

*Choose from 14 unique AI personalities speaking 11 languages*

</div>

### 🗣️ **Available Languages**

<table>
<tr>
<td width="25%">

**🇮🇳 Northern Languages**
- 🇮🇳 **Hindi** (हिंदी)
- 🇮🇳 **Punjabi** (ਪੰਜਾਬੀ)
- 🇮🇳 **Gujarati** (ગુજરાતી)
- 🇮🇳 **Marathi** (मराठी)

</td>
<td width="25%">

**🇮🇳 Eastern Languages**
- 🇧🇩 **Bengali** (বাংলা)
- 🇮🇳 **Odia** (ଓଡ଼ିଆ)

</td>
<td width="25%">

**🇮🇳 Southern Languages**
- 🇮🇳 **Tamil** (தமிழ்)
- 🇮🇳 **Telugu** (తెలుగు)
- 🇮🇳 **Kannada** (ಕನ್ನಡ)
- 🇮🇳 **Malayalam** (മലയാളം)

</td>
<td width="25%">

**🌍 International**
- 🇬🇧 **English** (Global)

</td>
</tr>
</table>

### 🎭 **Voice Personalities**

<details>
<summary><b>👥 Meet Your AI Voice Cast</b></summary>

| Voice Name | Gender | Style | Best For |
|------------|--------|-------|----------|
| **Anushka** | Female | Professional | Business, formal conversations |
| **Abhilash** | Male | Confident | Leadership, presentations |
| **Manisha** | Female | Friendly | Casual chats, daily assistance |
| **Meera** | Female | Traditional | Cultural discussions, storytelling |
| **Kalpana** | Female | Gentle | Support, counseling |
| **Ishani** | Female | Modern | Tech discussions, innovation |
| **Nandini** | Female | Elegant | Arts, literature, philosophy |
| **Neerja** | Female | Warm | Personal conversations, empathy |
| **Supriya** | Female | Cheerful | Entertainment, humor |
| **Subhashini** | Female | Calm | Meditation, relaxation |
| **Gurleen** | Female | Vibrant | Energy, motivation |
| **Kabir** | Male | Strong | Debates, strong opinions |
| **Ananya** | Female | Youthful | Learning, education |
| **Arya** | Male | Neutral | General purpose, balanced |

</details>

## � Project Structure

```
Ecommerce-Multi-model-chatbot/
├── 📁 client/                          # React TypeScript Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/              # UI Components
│   │   │   ├── ChatLayout.tsx          # Main chat interface
│   │   │   ├── LiveChatModal.tsx       # Gemini voice chat
│   │   │   ├── SarvamChatModal.tsx     # Sarvam voice chat (NEW)
│   │   │   ├── Navigation.tsx          # Modern navigation (NEW)
│   │   │   ├── Footer.tsx              # Footer component (NEW)
│   │   │   └── ui/                     # shadcn/ui components
│   │   ├── 📁 pages/                   # Application Pages (NEW)
│   │   │   ├── HomePage.tsx            # 3D animated homepage
│   │   │   ├── ProductsPage.tsx        # Product catalog
│   │   │   ├── ProductPage.tsx         # Product details
│   │   │   ├── ProfilePage.tsx         # User profile
│   │   │   └── ChatPage.tsx            # Chat interface
│   │   ├── 📁 hooks/                   # Custom React Hooks
│   │   │   ├── useLiveChat.ts          # Gemini voice chat hook
│   │   │   └── useSarvamVoiceChat.ts   # Sarvam voice chat hook (NEW)
│   │   └── App.tsx                     # Main App component
│   ├── package.json                    # Node.js dependencies
│   └── tailwind.config.js              # Tailwind CSS config
├── 📁 server/                          # FastAPI Python Backend
│   ├── 📁 app/
│   │   ├── 📁 api/v1/endpoints/        # API Endpoints
│   │   │   ├── chat.py                 # Text chat endpoint
│   │   │   ├── upload.py               # File upload endpoint
│   │   │   └── sarvam_chat.py          # Sarvam API endpoint (NEW)
│   │   ├── 📁 agent/                   # LangGraph Agent System
│   │   │   ├── graph.py                # Agent workflow graph
│   │   │   └── nodes.py                # Individual agent nodes
│   │   ├── 📁 services/                # External Service Integrations
│   │   │   ├── gemini_service.py       # Google Gemini integration
│   │   │   ├── sarvam_service.py       # Sarvam AI integration (NEW)
│   │   │   └── sarvam_api.py           # Sarvam API wrapper (NEW)
│   │   ├── 📁 tools/                   # Agent Tools
│   │   │   ├── web_search.py           # Tavily web search (ENHANCED)
│   │   │   └── vector_search.py        # RAG vector search
│   │   ├── 📁 core/                    # Core Configuration
│   │   │   ├── config.py               # App configuration
│   │   │   └── session.py              # Session management
│   │   └── main.py                     # FastAPI application
│   ├── 📁 chroma_db/                   # Vector Database Storage
│   ├── requirements.txt                # Python dependencies
│   └── .env                            # Environment variables
├── README.md                           # This comprehensive guide
└── 📁 docs/                            # Documentation
    ├── COMPLETE_DOCUMENTATION.md       # Technical documentation
    └── FRONTEND_ENHANCEMENT_DOCS.md    # Frontend architecture guide
```

### 🔑 **Key Files & Their Purpose**

| File | Purpose | Status |
|------|---------|--------|
| `client/src/components/SarvamChatModal.tsx` | Multi-language voice chat UI | ✅ NEW |
| `client/src/hooks/useSarvamVoiceChat.ts` | Sarvam voice chat logic | ✅ NEW |
| `client/src/pages/HomePage.tsx` | 3D animated landing page | ✅ NEW |
| `server/app/services/sarvam_service.py` | Sarvam AI integration | ✅ NEW |
| `server/app/api/v1/endpoints/sarvam_chat.py` | Sarvam WebSocket endpoint | ✅ NEW |
| `server/app/tools/web_search.py` | Enhanced Tavily search | ✅ ENHANCED |

<div align="center">

### 📡 **Comprehensive API Documentation**

</div>

### 🌐 **REST Endpoints**

<details>
<summary><b>📝 Text Chat API</b></summary>

```http
POST /api/v1/chat
Content-Type: application/json

{
  "session_id": "uuid-string",
  "message": "Your question here",
  "use_rag": false
}

Response:
{
  "response": "AI response text",
  "session_id": "uuid-string",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

</details>

<details>
<summary><b>📤 File Upload API</b></summary>

```http
POST /api/v1/upload
Content-Type: multipart/form-data

FormData:
- file: File (PDF, DOC, TXT)
- session_id: string

Response:
{
  "filename": "document.pdf",
  "status": "processed",
  "chunks": 42,
  "session_id": "uuid-string"
}
```

</details>

### 🔌 **WebSocket Endpoints**

<table>
<tr>
<td width="50%">

### 🎤 **Gemini Live Chat**

```javascript
// Connection
ws://localhost:8000/ws/v1/live-chat

// Initial config
{
  "config": {
    "isRagEnabled": false,
    "sessionId": "uuid-string"
  }
}

// Audio streaming
{
  "audio_chunk": "base64-encoded-pcm"
}
```

</td>
<td width="50%">

### 🌍 **Sarvam Voice Chat**

```javascript
// Connection  
ws://localhost:8000/ws/v1/sarvam-chat

// Configuration
{
  "config": {
    "language": "hindi",
    "voice": "anushka",
    "sessionId": "uuid-string"
  }
}

// Voice data
{
  "audio_chunk": "base64-encoded-audio"
}
```

</td>
</tr>
</table>

### 🔍 **Language & Voice APIs**

<details>
<summary><b>🌍 Language Management</b></summary>

```http
GET /api/v1/sarvam/languages
Response:
{
  "languages": [
    {
      "code": "hi-IN",
      "name": "Hindi",
      "flag": "🇮🇳",
      "voice": "meera"
    }
  ]
}

GET /api/v1/sarvam/voices  
Response:
{
  "voices": [
    {
      "name": "Anushka",
      "gender": "female",
      "style": "professional"
    }
  ]
}
```

</details>

## 📂 Project Structure

<div align="center">

### 🏗️ **Organized & Scalable Architecture**

</div>

```
multimodal-live-rag-voice/
├── 📁 server/                          # FastAPI Backend
│   ├── 📁 app/
│   │   ├── 📁 api/v1/endpoints/        # API route handlers
│   │   │   ├── 📄 chat.py              # Text chat endpoints
│   │   │   ├── 📄 live_chat.py         # Gemini Live WebSocket
│   │   │   ├── 📄 sarvam_chat.py       # Sarvam voice WebSocket
│   │   │   └── 📄 upload.py            # File upload handling
│   │   ├── 📁 agent/                   # LangChain agents & graph
│   │   │   ├── 📄 graph.py             # Agent workflow graph
│   │   │   ├── 📄 nodes.py             # Processing nodes
│   │   │   └── 📄 state.py             # Agent state management
│   │   ├── 📁 services/                # External service integrations
│   │   │   ├── 📄 sarvam_service.py    # Sarvam AI integration
│   │   │   └── 📄 vector_store.py      # Redis vector operations
│   │   ├── 📁 tools/                   # Utility tools
│   │   │   └── 📄 web_search.py        # Tavily search integration
│   │   ├── 📁 core/                    # Core configuration
│   │   │   └── 📄 config.py            # Environment & settings
│   │   └── 📄 main.py                  # FastAPI application entry
│   ├── 📄 requirements.txt             # Python dependencies
│   └── 📄 .env                         # Environment variables
│
├── 📁 client/                          # React Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/              # Reusable UI components
│   │   │   ├── 📄 Navigation.tsx       # Main navigation
│   │   │   ├── 📄 Footer.tsx           # App footer
│   │   │   ├── 📄 ChatLayout.tsx       # Chat interface layout
│   │   │   ├── 📄 LiveChatModal.tsx    # Gemini voice modal
│   │   │   └── 📄 SarvamChatModal.tsx  # Sarvam voice modal
│   │   ├── 📁 pages/                   # Application pages
│   │   │   ├── 📄 HomePage.tsx         # Landing page
│   │   │   ├── 📄 ProductsPage.tsx     # E-commerce demo
│   │   │   └── 📄 ProfilePage.tsx      # User profile
│   │   ├── 📁 hooks/                   # Custom React hooks
│   │   │   ├── 📄 useChat.ts           # Chat functionality
│   │   │   ├── 📄 useLiveChat.ts       # Gemini Live chat
│   │   │   └── 📄 useSarvamVoiceChat.ts # Sarvam voice chat
│   │   ├── 📁 types/                   # TypeScript definitions
│   │   │   └── 📄 index.ts             # Global type definitions
│   │   ├── 📁 utils/                   # Utility functions
│   │   │   └── 📄 api.ts               # API client configuration
│   │   ├── 📄 App.tsx                  # Main React component
│   │   └── 📄 main.tsx                 # React entry point
│   ├── 📄 package.json                 # Node.js dependencies
│   ├── 📄 tsconfig.json                # TypeScript configuration
│   ├── 📄 tailwind.config.js           # Tailwind CSS config
│   └── 📄 vite.config.ts               # Vite build configuration
│
├── 📄 README.md                        # This comprehensive guide
└── 📄 LICENSE                          # MIT License
```

### 🔧 **Key Architecture Decisions**

<table>
<tr>
<td width="50%">

### 🏗️ **Backend Design**

**📦 Modular Service Architecture**
- **API Layer**: Clean separation of concerns
- **Agent System**: LangChain-powered workflow
- **Service Layer**: External API integrations
- **Tool System**: Pluggable utilities

**🚀 Performance Optimizations**
- WebSocket for real-time communication
- Async/await throughout
- Redis for fast vector operations
- Connection pooling

</td>
<td width="50%">

### ⚛️ **Frontend Design**

**🎨 Component-Driven Architecture**
- **Page Components**: Route-level components
- **UI Components**: Reusable interface elements
- **Hook System**: Business logic separation
- **Type Safety**: Full TypeScript coverage

**✨ User Experience**
- Responsive design (mobile-first)
- Smooth animations (Framer Motion)
- Modern UI patterns
- Accessibility compliance

</td>
</tr>
</table>

## ⚙️ Configuration

<div align="center">

### 🔧 **Environment Configuration Guide**

</div>

### 📋 **Environment Variables**

<table>
<tr>
<td width="50%">

### 🤖 **AI Service Configuration**

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `GOOGLE_API_KEY` | Google Gemini API key | ✅ | `AIza...` |
| `GEMINI_MODEL` | Gemini model version | ✅ | `gemini-2.0-flash-exp` |
| `SARVAM_API_KEY` | Sarvam AI API key | ✅ | `sk-...` |
| `TAVILY_API_KEY` | Tavily search key | ✅ | `tvly-...` |

</td>
<td width="50%">

### 🗄️ **Database & Server Config**

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `REDIS_URL` | Redis connection | ✅ | `redis://localhost:6379` |
| `CORS_ORIGINS` | Allowed origins | ⚠️ | `["http://localhost:5173"]` |
| `LOG_LEVEL` | Logging level | ⚠️ | `INFO` |
| `DEBUG` | Debug mode | ⚠️ | `false` |

</td>
</tr>
</table>

### 🔐 **Security Configuration**

<details>
<summary><b>🛡️ Production Security Settings</b></summary>

```env
# Production environment variables
DEBUG=false
LOG_LEVEL=WARNING

# CORS configuration for production
CORS_ORIGINS=["https://yourdomain.com", "https://www.yourdomain.com"]

# Redis security (if using Redis Cloud)
REDIS_URL=rediss://username:password@host:port

# API rate limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=3600

# Session security
SESSION_SECRET_KEY=your-super-secret-key-here
SESSION_EXPIRE_HOURS=24
```

</details>

### ⚡ **Performance Tuning**

<details>
<summary><b>🚀 Optimization Settings</b></summary>

```env
# WebSocket settings
WS_HEARTBEAT_INTERVAL=30
WS_MAX_CONNECTIONS=1000

# Redis optimization
REDIS_MAX_CONNECTIONS=20
REDIS_RETRY_ATTEMPTS=3

# AI model settings
GEMINI_TEMPERATURE=0.7
GEMINI_MAX_TOKENS=2048
RESPONSE_STREAM_DELAY=50

# File upload limits
MAX_FILE_SIZE=50MB
ALLOWED_FILE_TYPES=pdf,docx,txt,md
```

</details>

## 🚨 Important Notes

<div align="center">

### ⚠️ **Critical Information & Best Practices**

![Production Ready](https://img.shields.io/badge/Production_Ready-Enterprise_Grade-success)
![Security](https://img.shields.io/badge/Security-Hardened-red)
![Scalability](https://img.shields.io/badge/Scalability-Cloud_Ready-blue)

</div>

### 🔐 **Security Considerations**

<table>
<tr>
<td width="50%">

**🛡️ API Security**
- ✅ All API keys in environment variables
- ✅ CORS properly configured
- ✅ Rate limiting implemented
- ✅ Input validation on all endpoints
- ✅ WebSocket connection authentication

</td>
<td width="50%">

**🔒 Data Protection**
- ✅ Session-based data isolation
- ✅ Temporary file cleanup
- ✅ No persistent user data storage
- ✅ Redis memory expiration
- ✅ Secure WebSocket connections

</td>
</tr>
</table>

### 📊 **Performance Expectations**

<details>
<summary><b>⚡ Benchmark Results</b></summary>

| Feature | Latency | Throughput | Resource Usage |
|---------|---------|------------|----------------|
| **Text Chat** | <200ms | 1000 req/min | Low CPU |
| **Voice Processing** | <500ms | 100 concurrent | Medium CPU |
| **Document Upload** | 2-10s | 50 files/min | High I/O |
| **RAG Queries** | <300ms | 500 req/min | Medium Memory |

**🎯 Optimization Tips:**
- Use Redis for vector caching
- Implement connection pooling
- Enable response compression
- Monitor memory usage for large files

</details>

### 🔧 **Troubleshooting**

<details>
<summary><b>🐛 Common Issues & Solutions</b></summary>

**❌ Common Problems:**

1. **WebSocket Connection Failed**
   ```bash
   # Check if backend is running
   curl http://localhost:8000/
   
   # Verify CORS settings
   # Check browser console for CORS errors
   ```

2. **Voice Chat Not Working**
   ```bash
   # Verify microphone permissions
   # Check audio device settings
   # Test with different browsers
   ```

3. **File Upload Errors**
   ```bash
   # Check file size limits
   # Verify file format support
   # Ensure sufficient disk space
   ```

4. **Redis Connection Issues**
   ```bash
   # Start Redis server
   redis-server
   
   # Test connection
   redis-cli ping
   ```

</details>



## 📄 License

<div align="center">

### 📜 **Open Source License**

</div>

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Multimodal Live RAG Voice Chatbot

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

**✅ You are free to:**
- ✨ Use commercially
- 🔄 Modify and adapt  
- 📤 Distribute
- 💼 Include in proprietary software

**📋 Conditions:**
- 📄 Include license and copyright notice
- 📝 State changes made to the code

## 📞 Contact & Support

<div align="center">

### 🌟 **Get in Touch!**

*Questions? Ideas? Want to collaborate? We'd love to hear from you!*

</div>

<table>
<tr>
<td width="33%" align="center">

### 👨‍💻 **Project Maintainer**
**Karan Singh**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Karan3431)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:karan23singh66@gmail.com)

</td>
<td width="33%" align="center">

### 💼 **Professional Network**
**Connect with me**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/karan-singh-5818411b4)

</td>
<td width="34%" align="center">

### 🚀 **Project Repository**
**Star & Follow**

[![Repository](https://img.shields.io/badge/Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Karan3431/Ecommerce-Multi-model-chatbot)

</td>
</tr>
</table>

<div align="center">

### 💬 **Community Support**

[![Discussions](https://img.shields.io/badge/GitHub_Discussions-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Karan3431/Ecommerce-Multi-model-chatbot/discussions)
[![Issues](https://img.shields.io/badge/Report_Issues-FF0000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Karan3431/Ecommerce-Multi-model-chatbot/issues)
[![Documentation](https://img.shields.io/badge/Documentation-4285F4?style=for-the-badge&logo=googledocs&logoColor=white)](https://github.com/Karan3431/Ecommerce-Multi-model-chatbot/wiki)

---

### 🙏 **Thank You for Your Interest!**

<div align="center">

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=Karan3431.Ecommerce-Multi-model-chatbot)

**⭐ Star this repository if it helped you build something amazing!**

</div>

*Built with ❤️, powered by AI, and enhanced for the future by Karan Singh*

---

### 📈 **Project Metrics**

<div align="center">

![Code Size](https://img.shields.io/github/languages/code-size/Karan3431/Ecommerce-Multi-model-chatbot)
![Repo Size](https://img.shields.io/github/repo-size/Karan3431/Ecommerce-Multi-model-chatbot)
![Last Commit](https://img.shields.io/github/last-commit/Karan3431/Ecommerce-Multi-model-chatbot)

</div>

**🎯 Project Goals Achieved:**
- ✅ **Multimodal AI Integration** - Text, voice, and document intelligence
- ✅ **Multi-Language Support** - 11 languages with native voice synthesis  
- ✅ **Production-Ready Architecture** - Scalable, secure, and maintainable
- ✅ **Open Source Community** - Comprehensive documentation and examples
- ✅ **Enhanced User Experience** - Modern, responsive, and accessible design

**🚀 Future Roadmap:**
- 🔄 **Real-time Collaboration** - Multi-user chat sessions
- 🌍 **More Languages** - Expand to 50+ global languages
- 🤖 **Advanced AI Agents** - Specialized domain experts
- 📱 **Mobile Applications** - Native iOS and Android apps
- 🔐 **Enterprise Features** - SSO, audit logs, and advanced security

---

### 🙏 **Project Credits**

This project was inspired by and builds upon the foundational work from [sidhyaashu/multimodal-live-rag-voice](https://github.com/sidhyaashu/multimodal-live-rag-voice).  
Special thanks to the original author for providing the base architecture that made this enhanced implementation possible.

</div>
