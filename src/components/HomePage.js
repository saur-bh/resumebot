import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Settings, Sparkles, Bot, Mic, MicOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import SimpleBackground from './SimpleBackground';
import { getProfileData } from '../firebase/firestore';
import { processMessageWithAI } from '../services/seekAI';
import { demoProfile } from '../data/demoProfile';

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    loadProfileData();
    initializeSpeechRecognition();
    // Add welcome message
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: `Hello! I’m Saurabh 👋 — your interactive guide to know more about me. Ask me anything about my QA engineering experience, skills, projects, or the way I work. You can type or even use voice input!`,
        timestamp: new Date(),
        suggestions: [
          "Who are you?",
          "Show me your testing videos",
          "What articles have you written?",
          "Can I download your resume?",
          "Where can I find more about you?",
          "What are your skills?"
        ]
      }
    ]);
  }, []);

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      setSpeechSupported(true);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadProfileData = async () => {
    try {
      const data = await getProfileData();
      // Use demo data if no profile data is available
      setProfileData(data || demoProfile);
    } catch (error) {
      console.error('Error loading profile data:', error);
      // Fallback to demo data
      setProfileData(demoProfile);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Get AI response from configured AI provider or fallback
    try {
      const botResponse = await processMessageWithAI(
        inputValue, 
        profileData, 
        messages, 
        profileData?.files || []
      );
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback to local response
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
    }
    setIsTyping(false);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Simple response logic (replace with Seek AI integration)
    let response = {
      id: Date.now() + 1,
      type: 'bot',
      content: '',
      timestamp: new Date(),
      media: null
    };

    if (input.includes('experience') || input.includes('background')) {
      response.content = "I have extensive experience in software testing and automation. I specialize in creating robust test frameworks, implementing CI/CD pipelines, and ensuring high-quality software delivery. I've worked with various technologies including Selenium, Cypress, Jest, and many more.";
    } else if (input.includes('skill') || input.includes('technical')) {
      response.content = "My technical skills include:\n\n• **Testing Frameworks**: Selenium, Cypress, Jest, TestNG\n• **Programming**: JavaScript, Python, Java, TypeScript\n• **CI/CD**: Jenkins, GitHub Actions, Docker\n• **Databases**: SQL, MongoDB, PostgreSQL\n• **Cloud**: AWS, Azure, Firebase\n• **Mobile Testing**: Appium, Detox\n• **API Testing**: Postman, REST Assured";
    } else if (input.includes('automation') || input.includes('testing process')) {
      response.content = "Here's how I approach automation testing:\n\n1. **Test Planning**: Analyze requirements and create comprehensive test strategies\n2. **Framework Design**: Build scalable and maintainable test frameworks\n3. **Implementation**: Write robust, reusable test scripts\n4. **Integration**: Set up CI/CD pipelines for automated execution\n5. **Reporting**: Generate detailed test reports and metrics\n6. **Maintenance**: Continuously improve and update test suites";
      response.media = { type: 'video', url: '/videos/automation-process.mp4', title: 'Automation Testing Process' };
    } else if (input.includes('project')) {
      response.content = "I've worked on several exciting projects:\n\n• **E-commerce Platform Testing**: Built comprehensive test suite for a large-scale e-commerce platform\n• **Mobile App Testing**: Developed automated tests for iOS and Android applications\n• **API Testing Framework**: Created a robust API testing framework with detailed reporting\n• **Performance Testing**: Implemented load testing strategies for high-traffic applications";
    } else if (input.includes('contact') || input.includes('reach')) {
      response.content = "You can reach me through:\n\n• **Email**: your.email@example.com\n• **LinkedIn**: linkedin.com/in/yourprofile\n• **GitHub**: github.com/yourusername\n• **Portfolio**: yourportfolio.com\n\nI'm always open to discussing new opportunities and collaborations!";
    } else {
      response.content = "That's an interesting question! While I have information about my experience and skills, I'd be happy to discuss this further. Could you be more specific about what you'd like to know?";
    }

    return response;
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="min-h-screen bg-chat-bg relative overflow-hidden">
      <SimpleBackground />
      
      {/* Header */}
      <header className="relative z-10 bg-cloud-white bg-opacity-90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                {profileData?.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto}
                    alt={profileData.name || 'Profile'}
                    className="w-10 h-10 rounded-full object-cover border-2 border-sarya-purple"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-r from-sarya-purple to-sky-blue rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-deep-brown">
                  {profileData?.name ? `${profileData.name}'s Chatbot` : 'Resume Chatbot'}
                </h1>
                <p className="text-sm text-gray-600">{profileData?.title || 'QA Engineer'}</p>
              </div>
            </motion.div>
            
            <Link to="/settings">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-sarya-purple hover:bg-soft-lavender rounded-lg transition-colors"
              >
                <Settings className="w-6 h-6" />
              </motion.button>
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card min-h-[600px] flex flex-col"
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-6">
            <AnimatePresence>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onSuggestionClick={handleSuggestionClick}
                />
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-gray-500"
              >
                <Bot className="w-5 h-5" />
                <div className="flex space-x-1">
                  <div className="typing-indicator"></div>
                  <div className="typing-indicator"></div>
                  <div className="typing-indicator"></div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about my experience, skills, or projects..."
                  className="input-field pr-20"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  {speechSupported && (
                    <motion.button
                      onClick={toggleListening}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-lg transition-colors ${
                        isListening 
                          ? 'text-friendly-red bg-red-50' 
                          : 'text-sarya-purple hover:bg-soft-lavender'
                      }`}
                    >
                      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </motion.button>
                  )}
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-sarya-purple hover:bg-soft-lavender rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
            {isListening && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center space-x-2 text-sm text-sarya-purple"
              >
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-sarya-purple rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-sarya-purple rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-sarya-purple rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span>Listening...</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
