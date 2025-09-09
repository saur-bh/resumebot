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
        timestamp: new Date()
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
      case 'website':
        return [
          "Show me your testing videos",
          "What articles have you written?",
          "Show me your certifications",
          "What are your skills?"
        ];
      case 'certifications':
        return [
          "Show me your testing videos",
          "What articles have you written?",
          "Show me your personal website",
          "What are your skills?"
        ];
      case 'common-question':
        return [
          "Show me your testing videos",
          "What articles have you written?",
          "Show me your certifications",
          "Show me your personal website"
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
    
    // Handle personal website requests FIRST - before video detection
    if (input.includes('personal website') || input.includes('website') || input.includes('portfolio') ||
        (input.includes('show me') && input.includes('website'))) {
      return {
        id: Date.now(),
        type: 'bot',
        content: "🌐 **Here's my personal website!** Built with pure HTML, CSS, and JavaScript - no frameworks, just web fundamentals. Perfect for understanding how the web actually works!",
        timestamp: new Date(),
        website: {
          url: 'https://saur-bh.github.io/me/',
          title: 'Saurabh\'s Personal Website',
          description: 'Pure HTML/CSS/JS showcase'
        },
        source: 'website',
        suggestions: getDynamicSuggestions('bot', 'website')
      };
    }
    
    // Handle video requests SECOND
    if (input.includes('video') || input.includes('youtube') || input.includes('testing videos') || 
        (input.includes('show me') && input.includes('video')) || input.includes('videos')) {
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
    
    // Handle certification requests
    if (input.includes('certification') || input.includes('certificate') || input.includes('cert') ||
        input.includes('show me your certifications') || input.includes('linkedin certifications')) {
      return {
        id: Date.now(),
        type: 'bot',
        content: "🏆 **Here are my professional certifications!**",
        timestamp: new Date(),
        certifications: profileData.certifications,
        source: 'certifications',
        suggestions: getDynamicSuggestions('bot', 'certifications')
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
      content: "🤔 **That's an interesting question!**\n\nI'm still learning and getting trained! I'm designed to focus on my QA engineering expertise and the content I've shared. While I don't have web search capabilities, I'd love to help you with:\n\n**🎯 What I Can Help With:**\n• My testing experience and methodologies\n• My automation videos and articles\n• My skills and technical background\n• My approach to quality assurance\n• How to download my resume\n• Connecting with me directly\n\n**💬 Let's Chat!**\nFor topics outside my current knowledge, feel free to reach out to me directly at **saurabh-verma@outlook.com** - I'd be happy to discuss anything in detail! 😊\n\n**🚀 Try asking me about:**\n• \"Who are you?\"\n• \"Show me your testing videos\"\n• \"What are your skills?\"\n• \"How do you approach testing?\"",
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
    <div className="min-h-screen bg-dark-bg cyber-grid-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric-blue opacity-10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-neon-pink opacity-10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-lime-green opacity-10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 glass-effect border-b border-border-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="relative">
                {profileData?.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto}
                    alt={profileData.name || 'Profile'}
                    className="w-12 h-12 rounded-full object-cover border-2 border-electric-blue shadow-2xl animate-glow-pulse"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-r from-electric-blue to-neon-pink rounded-full flex items-center justify-center shadow-2xl animate-glow-pulse">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold font-display gradient-text">
                  Saurabh Verma
                </h1>
                <p className="text-sm text-white text-opacity-80 font-medium">QA Engineer & Product Builder</p>
              </div>
            </motion.div>
            
            {/* Download Resume Button */}
            <motion.button
              onClick={handleDownloadResume}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cyber-button text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span className="font-medium">Resume</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-3xl min-h-[700px] flex flex-col overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-electric-blue via-purple-rain to-neon-pink p-4 text-white relative overflow-hidden">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <img 
                  src="/myphoto.png" 
                  alt="Saurabh Verma" 
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Saurabh Verma</h3>
                <p className="text-sm opacity-90">QA Engineer & Product Builder</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-6 bg-gradient-to-b from-dark-bg/50 to-dark-bg">
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
          <div className="border-t border-border-glow bg-glass-dark p-6">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about my experience, skills, or projects..."
                  className="w-full px-6 py-4 pr-24 bg-glass-white border-2 border-electric-blue rounded-2xl focus:border-neon-pink focus:ring-4 focus:ring-neon-pink focus:ring-opacity-30 transition-all duration-300 text-sm shadow-sm hover:shadow-md backdrop-blur-md text-white placeholder-gray-400"
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
                        ? 'text-white bg-gradient-to-r from-electric-blue to-neon-pink shadow-lg hover:shadow-xl animate-glow-pulse' 
                        : 'text-gray-400 bg-glass-white border border-border-glow'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-white text-opacity-60 mr-2 font-medium">Quick actions:</span>
              {['Who are you?', 'Show videos', 'My articles', 'Certifications', 'Personal website', 'Download resume'].map((action, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    if (action === 'Personal website') {
                      setInputValue('Show me your personal website');
                      handleSendMessage();
                    } else {
                      setInputValue(action);
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 text-xs bg-glass-white border border-border-glow rounded-full hover:border-electric-blue hover:text-electric-blue transition-all duration-200 text-white hover:shadow-lg hover:shadow-electric-blue/20"
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
