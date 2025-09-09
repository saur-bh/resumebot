# Personal QA Engineer Chatbot

A modern, interactive chatbot that showcases your professional profile as a QA Engineer. Built with React, Node.js, and Three.js for an engaging user experience.

## Features

- 🤖 **AI-Powered Chat**: Uses OpenAI/DeepSeek APIs for intelligent responses
- 🎨 **Interactive UI**: Beautiful design with Three.js animations and Tailwind CSS
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 📄 **Data Management**: Upload resume, social media info, and additional details
- 🔒 **Secure**: Rate limiting, CORS protection, and input validation
- ⚡ **Real-time**: Instant responses with typing indicators

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Three.js with React Three Fiber
- Framer Motion for animations
- Axios for API calls

### Backend
- Node.js with Express
- OpenAI API integration
- DeepSeek API fallback
- Multer for file uploads
- Helmet for security

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- OpenAI API key
- DeepSeek API key (optional, for fallback)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo>
   cd MyBot
   npm run install-all
   ```

2. **Set up environment variables:**
   ```bash
   cd server
   cp env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```
   PORT=5000
   OPENAI_API_KEY=your_openai_api_key_here
   DEEPSEEK_API_KEY=your_deepseek_api_key_here
   NODE_ENV=development
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend (port 3000).

## Usage

### 1. Upload Your Data
- Go to the profile section
- Upload your resume/CV as a file or paste the content
- Add your social media profiles and additional information
- The AI will use this data to answer questions about you

### 2. Chat Interface
- Ask questions about your testing experience
- Inquire about your QA methodologies
- Discuss your technical skills and tools
- The bot will respond based on your uploaded data

### 3. Example Questions
- "Tell me about your testing experience"
- "What testing tools do you use?"
- "Describe your QA process"
- "What's your experience with automation?"

## API Endpoints

### Chat
- `POST /api/chat/message` - Send a message to the chatbot
- `GET /api/chat/suggestions` - Get conversation suggestions

### Data Management
- `POST /api/data/upload` - Upload files (resume, documents)
- `POST /api/data/personal-info` - Update personal information
- `GET /api/data/info` - Get data source information

## Customization

### Brand Colors
The app uses a custom color palette defined in `tailwind.config.js`:
- Sarya Purple (#8C5BAA) - Primary brand color
- Sunshine Yellow (#F4C542) - Accent color
- Sky Blue (#58AEDA) - Secondary accent
- And more...

### System Prompt
Modify the system prompt in `server/services/aiService.js` to change how the AI responds and what persona it adopts.

### Three.js Animations
Customize the 3D animations in `client/src/components/ThreeScene.js` to match your preferences.

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the build folder
```

### Backend (Railway/Heroku)
```bash
cd server
# Set environment variables in your hosting platform
# Deploy the server folder
```

## Security Features

- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Input validation and sanitization
- File upload restrictions
- Helmet.js security headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this for your own personal chatbot!

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your API keys are correct
3. Ensure all dependencies are installed
4. Check that both frontend and backend are running

---

Built with ❤️ for showcasing QA engineering expertise!
