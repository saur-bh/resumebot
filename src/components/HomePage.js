import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Bot, Mic, MicOff, Download } from 'lucide-react';
import ChatMessage from './ChatMessage';
import SimpleBackground from './SimpleBackground';
import { demoProfile } from '../data/demoProfile';

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [profileData] = useState(demoProfile);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    initializeSpeechRecognition();
    // Add welcome message
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: `Hello! I'm Saurabh 👋 — your interactive guide to know more about me. Ask me anything about my QA engineering experience, skills, projects, or the way I work. You can type or even use voice input!`,
        timestamp: new Date(),
        suggestions: [
          "Who are you?",
          "Show me your testing videos",
          "What articles have you written?",
          "Show me your personal website",
          "Can I download your resume?",
          "Where can I find more about you?"
        ]
      }
    ]);
  }, []);

  // Dynamic suggestions based on message type
  const getDynamicSuggestions = (messageType, source) => {
    const baseSuggestions = [
      "Who are you?",
      "What are your skills?",
      "Tell me about your experience",
      "Where can I find more about you?"
    ];

    switch (source) {
      case 'videos':
        return [
          "What articles have you written?",
          "Show me your personal website",
          "What are your skills?",
          "How do you approach testing?"
        ];
      case 'articles':
        return [
          "Show me your testing videos",
          "Show me your personal website",
          "What are your skills?",
          "How do you approach testing?"
        ];
      case 'common-question':
        return [
          "Show me your testing videos",
          "What articles have you written?",
          "Show me your personal website",
          "Can I download your resume?"
        ];
      default:
        return baseSuggestions;
    }
  };

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


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const processMessageFrontend = (message, profileData) => {
    const input = message.toLowerCase();
    
    // Handle video requests FIRST
    if (input.includes('video') || input.includes('youtube') || input.includes('testing videos') || 
        input.includes('show me') || input.includes('show') || input.includes('videos')) {
      return {
        id: Date.now(),
        type: 'bot',
        content: "Here are my testing videos that showcase my automation expertise:",
        timestamp: new Date(),
        videos: profileData.youtubeVideos,
        source: 'videos',
        suggestions: getDynamicSuggestions('bot', 'videos')
      };
    }
    
    // Handle article requests SECOND - before common questions
    if (input.includes('article') || input.includes('medium') || input.includes('written') || 
        input.includes('what articles') || input.includes('articles have you')) {
      return {
        id: Date.now(),
        type: 'bot',
        content: "Here are my articles on testing and product development:",
        timestamp: new Date(),
        articles: profileData.mediumPosts,
        source: 'articles',
        suggestions: getDynamicSuggestions('bot', 'articles')
      };
    }
    
    // Check common questions AFTER video/article checks
    const commonMatch = profileData?.commonQuestions?.find(qa => 
      input.includes(qa.question.toLowerCase().split(' ')[0]) ||
      (input.includes('who are you') && qa.question.includes('who are you')) ||
      (input.includes('what do you do') && qa.question.includes('what do you do')) ||
      (input.includes('your skills') && qa.question.includes('skills')) ||
      (input.includes('your experience') && qa.question.includes('experience')) ||
      (input.includes('how do you') && qa.question.includes('how do you'))
    );
    
    if (commonMatch) {
      return {
        id: Date.now(),
        type: 'bot',
        content: commonMatch.response,
        timestamp: new Date(),
        source: 'common-question',
        suggestions: getDynamicSuggestions('bot', 'common-question')
      };
    }
    
    // Default response
    return {
      id: Date.now(),
      type: 'bot',
      content: "🤔 **That's an interesting question!**\n\nI'm designed to focus on my QA engineering expertise and the content I've shared. While I don't have web search capabilities, I'd love to help you with:\n\n**🎯 What I Can Help With:**\n• My testing experience and methodologies\n• My automation videos and articles\n• My skills and technical background\n• My approach to quality assurance\n• How to download my resume\n• Connecting with me directly\n\n**💬 Let's Chat!**\nFor topics outside my current knowledge, feel free to reach out to me directly at **saurabh-verma@outlook.com** - I'd be happy to discuss anything in detail! 😊\n\n**🚀 Try asking me about:**\n• \"Who are you?\"\n• \"Show me your testing videos\"\n• \"What are your skills?\"\n• \"How do you approach testing?\"",
      timestamp: new Date(),
      source: 'fallback',
      suggestions: [
        "Who are you?",
        "Show me your testing videos", 
        "What are your skills?",
        "How do you approach testing?",
        "Show me your personal website",
        "Can I download your resume?"
      ]
    };
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

    // Use frontend-only processing
    setTimeout(() => {
      const botResponse = processMessageFrontend(inputValue, profileData);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };


  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Saurabh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                  Saurabh QA
                </h1>
                <p className="text-sm text-gray-600"></p>
              </div>
            </motion.div>
            
            {/* Download Resume Button */}
            <motion.button
              onClick={handleDownloadResume}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-sarya-purple text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Resume</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 min-h-[700px] flex flex-col overflow-hidden backdrop-blur-sm"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-sarya-purple to-accent-purple p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <img 
                  src="/myphoto.png" 
                  alt="Saurabh QA" 
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Saurabh QA</h3>
                <p className="text-sm opacity-90">QA Engineer & Product Builder</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-6 bg-gradient-to-b from-gray-50/50 to-white">
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
          <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about my experience, skills, or projects..."
                  className="w-full px-6 py-4 pr-24 bg-white border-2 border-gray-200 rounded-2xl focus:border-sarya-purple focus:ring-4 focus:ring-sarya-purple focus:ring-opacity-10 transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
                  {speechSupported && (
                    <motion.button
                      onClick={toggleListening}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-xl transition-all duration-200 ${
                        isListening 
                          ? 'text-white bg-gradient-to-r from-friendly-red to-red-500 shadow-lg' 
                          : 'text-sarya-purple hover:bg-soft-lavender hover:shadow-md'
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
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      inputValue.trim() 
                        ? 'text-white bg-gradient-to-r from-sarya-purple to-accent-purple shadow-lg hover:shadow-xl' 
                        : 'text-gray-400 bg-gray-100'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 mr-2">Quick actions:</span>
              {['Who are you?', 'Show videos', 'My articles', 'Personal website', 'Download resume'].map((action, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    if (action === 'Personal website') {
                      window.location.href = 'https://saur-bh.github.io/me/';
                    } else {
                      setInputValue(action);
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-full hover:border-sarya-purple hover:text-sarya-purple transition-all duration-200"
                >
                  {action}
                </motion.button>
              ))}
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
