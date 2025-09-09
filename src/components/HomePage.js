import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Bot, Mic, MicOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import SimpleBackground from './SimpleBackground';
import { demoProfile } from '../data/demoProfile';

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [profileData, setProfileData] = useState(demoProfile);
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


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const processMessageFrontend = (message, profileData) => {
    const input = message.toLowerCase();
    
    // Check common questions first
    const commonMatch = profileData?.commonQuestions?.find(qa => 
      input.includes(qa.question.toLowerCase().split(' ')[0]) ||
      input.includes('who are you') && qa.question.includes('who are you') ||
      input.includes('what do you do') && qa.question.includes('what do you do') ||
      input.includes('your skills') && qa.question.includes('skills') ||
      input.includes('your experience') && qa.question.includes('experience') ||
      input.includes('how do you') && qa.question.includes('how do you')
    );
    
    if (commonMatch) {
      return {
        id: Date.now(),
        type: 'bot',
        content: commonMatch.response,
        timestamp: new Date(),
        source: 'common-question'
      };
    }
    
    // Handle video requests
    if (input.includes('video') || input.includes('youtube') || input.includes('testing videos')) {
      return {
        id: Date.now(),
        type: 'bot',
        content: "Here are my testing videos:",
        timestamp: new Date(),
        videos: profileData.youtubeVideos,
        source: 'videos'
      };
    }
    
    // Handle article requests
    if (input.includes('article') || input.includes('medium') || input.includes('written')) {
      return {
        id: Date.now(),
        type: 'bot',
        content: "Here are my articles:",
        timestamp: new Date(),
        articles: profileData.mediumPosts,
        source: 'articles'
      };
    }
    
    // Default response
    return {
      id: Date.now(),
      type: 'bot',
      content: "I have limited knowledge and focus on my QA engineering experience, testing methodologies, and the content I've shared. I'm not doing web search currently and have limited knowledge about topics outside my expertise, but I'll keep this in mind and update you later. You can also write to me at saurabh-verma@outlook.com for more detailed discussions!",
      timestamp: new Date(),
      source: 'fallback'
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
