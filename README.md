# Personal QA Engineer Chatbot

A modern, interactive chatbot that showcases your professional profile as a QA Engineer. Built with React, Firebase, and beautiful animations for an engaging user experience.

## Features

- 🤖 **AI-Powered Chat**: Uses multiple AI providers (OpenAI, Gemini, DeepSeek) for intelligent responses
- 🎨 **Interactive UI**: Beautiful design with custom animations and Tailwind CSS
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎤 **Voice Input**: Speak your questions using microphone support
- 📺 **YouTube Integration**: Embed demo videos and tutorials
- 🔐 **Secure Authentication**: Firebase Auth with profile management
- ⚙️ **Multi-Provider AI**: Support for OpenAI, Google Gemini, and DeepSeek APIs
- 💾 **Data Persistence**: All data stored securely in Firebase Firestore

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Framer Motion for animations
- Lucide React for icons
- React Dropzone for file uploads

### Backend
- Firebase Authentication
- Firebase Firestore
- Firebase Storage

### AI Integration
- OpenAI API
- Google Gemini API
- DeepSeek API
- Fallback responses for offline mode

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Firebase project with Authentication and Firestore enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saur-bh/resumebot.git
   cd resumebot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Follow the instructions in `FIREBASE_SETUP.md`
   - Configure Firestore security rules
   - Enable Authentication (Email/Password)
   - Create your user account

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### For Visitors (Home Page)
- Visit the home page to interact with the chatbot
- Ask questions about experience, skills, projects, or automation processes
- Use voice input by clicking the microphone icon
- No login required - the chatbot uses publicly available profile data

### For Profile Owners (Settings Page)
1. **Login**: Sign in with your Firebase account
2. **Access Settings**: Click the settings icon to manage your profile
3. **Configure AI Provider**: Add your API key (OpenAI/Gemini/DeepSeek)
4. **Fill Profile Information**:
   - Basic information (name, title, bio)
   - Skills (add/remove as needed)
   - Work experience and projects
   - Contact information
5. **Add YouTube Videos**: Embed demo videos and tutorials
6. **Upload Files**: Add documents, images, or videos to showcase your work
7. **Save Profile**: Your information will be available to chatbot visitors

## Brand Colors

The application uses a carefully designed color palette:

- **Primary**: Sarya Purple (#8C5BAA)
- **Accents**: 
  - Sunshine Yellow (#F4C542)
  - Friendly Red (#D9534F)
  - Grass Green (#7CAF3F)
  - Sky Blue (#58AEDA)
- **Secondary**:
  - Soft Lavender (#D9CCEC)
  - Muted Beige (#FAF5ED)
  - Deep Brown (#4A3C2D)
  - Cloud White (#F7F9FB)

## AI Integration

The chatbot supports multiple AI providers:

### OpenAI
- GPT-3.5 Turbo, GPT-4, GPT-4 Turbo
- Add your API key in Settings → AI API Settings

### Google Gemini
- Gemini Pro, Gemini Pro Vision
- Add your API key in Settings → AI API Settings

### DeepSeek
- DeepSeek Chat, DeepSeek Coder
- Add your API key in Settings → AI API Settings

### Fallback Mode
- If no API key is configured, the chatbot uses intelligent fallback responses
- Based on your profile data and common QA engineering questions

## File Structure

```
src/
├── components/
│   ├── HomePage.js          # Main chatbot interface
│   ├── SettingsPage.js      # Profile management
│   ├── LoginPage.js         # Authentication
│   ├── ChatMessage.js       # Individual chat messages
│   ├── FileUpload.js        # File upload component
│   ├── ThreeJSBackground.js # 3D background
│   └── LoadingSpinner.js    # Loading states
├── firebase/
│   ├── config.js           # Firebase configuration
│   ├── auth.js             # Authentication functions
│   └── firestore.js        # Database operations
├── App.js                  # Main app component
├── index.js               # App entry point
└── index.css              # Global styles
```

## Customization

### Adding New Features
- **New Chat Commands**: Update the `generateBotResponse` function
- **Additional File Types**: Modify the `FileUpload` component
- **Custom Animations**: Use Framer Motion for new animations
- **3D Elements**: Add more Three.js components

### Styling
- **Colors**: Update `tailwind.config.js` for new color schemes
- **Components**: Modify component styles in individual files
- **Global Styles**: Update `src/index.css` for global changes

## Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the build folder
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Environment Variables
Make sure to set up your Firebase configuration in your hosting platform:
- Firebase API Key
- Firebase Auth Domain
- Firebase Project ID
- Firebase Storage Bucket
- Firebase Messaging Sender ID
- Firebase App ID

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues:

1. Check the console for error messages
2. Verify your Firebase configuration is correct
3. Ensure all dependencies are installed
4. Check that Firebase services are enabled
5. Verify your API keys are valid

For support or questions, please open an issue in the repository.

---

Built with ❤️ for showcasing QA engineering expertise!
