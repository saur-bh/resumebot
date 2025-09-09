import React from 'react';
import { motion } from 'framer-motion';
import { User, FileText, Video, Image, ExternalLink, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message, onSuggestionClick }) => {
  const isUser = message.type === 'user';
  const isBot = message.type === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-start space-x-3 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-gradient-to-r from-electric-blue to-purple-rain shadow-lg animate-glow-pulse' 
            : 'bg-gradient-to-r from-neon-pink to-cyber-orange shadow-lg animate-glow-pulse'
        }`}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <img 
              src="/myphoto.png" 
              alt="Saurabh Verma" 
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
          )}
        </div>

        {/* Message Content */}
        <div className={`${isUser ? 'items-end' : 'items-start'} flex flex-col space-y-2`}>
          <div className={`chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-bot'} backdrop-blur-md`}>
            {isBot ? (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-none mb-3 space-y-2">{children}</ul>,
                    li: ({ children }) => <li className="text-sm flex items-start space-x-2">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                    code: ({ children }) => (
                      <code className="bg-glass-white text-electric-blue px-1 py-0.5 rounded text-xs border border-border-glow">
                        {children}
                      </code>
                    ),
                    a: ({ href, children }) => (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-electric-blue hover:text-neon-pink underline decoration-2 underline-offset-2 hover:decoration-neon-pink transition-all duration-200"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
                
                {/* Display Videos */}
                {message.videos && message.videos.length > 0 && (
                  <div className="mt-6 w-full">
                    <div className="space-y-4">
                      {message.videos.map((video, index) => (
                        <motion.div 
                          key={video.id} 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group w-full"
                        >
                          <div className="glass-effect rounded-2xl p-6 border border-border-glow hover:border-red-500 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10">
                            <div className="flex flex-col lg:flex-row gap-6">
                              {/* Video Thumbnail */}
                              <div className="flex-shrink-0">
                                <div className="relative w-full lg:w-80">
                                  <a 
                                    href={video.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block w-full group/thumb"
                                  >
                                    <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-red-500/25 transition-all duration-300">
                                      <img
                                        src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                                        alt={video.title}
                                        className="w-full h-48 lg:h-40 object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                          e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                                        }}
                                      />
                                      {/* Play Button Overlay */}
                                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/thumb:bg-black/30 transition-colors duration-300">
                                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover/thumb:bg-red-700 group-hover/thumb:scale-110 transition-all duration-300">
                                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                          </svg>
                                        </div>
                                      </div>
                                      {/* YouTube Badge */}
                                      <div className="absolute top-3 right-3">
                                        <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                          </svg>
                                          <span>YouTube</span>
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                              
                              {/* Video Content */}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-red-400 transition-colors duration-300">
                                  {video.title}
                                </h4>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                  Click the thumbnail to watch this testing tutorial on YouTube
                                </p>
                                
                                {/* Action Button */}
                                <div className="flex items-center justify-between">
                                  <a 
                                    href={video.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:shadow-red-500/25 hover:-translate-y-0.5"
                                  >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                    <span>Watch Video</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                  
                                  <div className="text-xs text-gray-400">
                                    <span className="inline-flex items-center space-x-1">
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                      </svg>
                                      <span>Video</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Special Contact Information Display */}
                {message.content && message.content.includes('Let\'s Connect!') && (
                  <div className="mt-4 p-4 bg-gradient-to-br from-sarya-purple/5 to-accent-purple/5 rounded-xl border border-sarya-purple/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Portfolio & Work */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-deep-brown flex items-center space-x-2">
                          <span className="text-lg">🌐</span>
                          <span>Portfolio & Work</span>
                        </h4>
                        <div className="space-y-2">
                          <a 
                            href="https://saur-bh.github.io/me/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                          >
                            <span className="text-blue-500">🌐</span>
                            <span className="text-sm font-medium text-deep-brown">Personal Website</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </a>
                          <a 
                            href="https://github.com/saur-bh" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                          >
                            <span className="text-gray-800">💻</span>
                            <span className="text-sm font-medium text-deep-brown">GitHub Projects</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </a>
                          <a 
                            href="https://medium.com/@_.saurabh" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                          >
                            <span className="text-orange-500">📝</span>
                            <span className="text-sm font-medium text-deep-brown">Medium Articles</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </a>
                        </div>
                      </div>
                      
                      {/* Direct Contact */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-deep-brown flex items-center space-x-2">
                          <span className="text-lg">📧</span>
                          <span>Direct Contact</span>
                        </h4>
                        <div className="space-y-2">
                          <a 
                            href="mailto:saurabh-verma@outlook.com" 
                            className="flex items-center space-x-2 p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                          >
                            <span className="text-blue-600">📧</span>
                            <span className="text-sm font-medium text-deep-brown">saurabh-verma@outlook.com</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </a>
                          <div className="flex items-center space-x-2 p-2 bg-gradient-to-r from-sarya-purple to-accent-purple text-white rounded-lg">
                            <span className="text-white">📄</span>
                            <span className="text-sm font-medium">Resume Available Above ⬆️</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* What I Love Discussing */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-deep-brown flex items-center space-x-2 mb-3">
                        <span className="text-lg">💬</span>
                        <span>What I Love Discussing</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Testing strategies & automation frameworks',
                          'Product development & quality assurance',
                          'CI/CD pipelines & DevOps practices',
                          'Career opportunities & collaborations'
                        ].map((topic, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-white text-sarya-purple text-xs font-medium rounded-full border border-sarya-purple/20 hover:bg-sarya-purple/5 transition-colors"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Display Website Webview */}
                {message.website && (
                  <div className="mt-6 w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="group w-full"
                    >
                      <div className="glass-effect rounded-2xl p-6 border border-border-glow hover:border-electric-blue transition-all duration-300 hover:shadow-xl hover:shadow-electric-blue/10">
                        {/* Header */}
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-purple-rain rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-2xl">🌐</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">Personal Website Preview</h4>
                            <p className="text-sm text-gray-300">Interactive preview of my portfolio</p>
                          </div>
                        </div>
                        
                        {/* Browser Window */}
                        <div className="bg-dark-bg rounded-xl border border-border-glow overflow-hidden shadow-2xl">
                          {/* Browser Header */}
                          <div className="bg-glass-dark px-4 py-3 border-b border-border-glow flex items-center space-x-3">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                              <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                            </div>
                            <div className="flex-1 bg-glass-white rounded-lg px-3 py-1.5 border border-border-glow">
                              <div className="flex items-center space-x-2">
                                <svg className="w-3 h-3 text-electric-blue" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs text-white truncate">{message.website.url}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-xs text-gray-400">Secure</span>
                            </div>
                          </div>
                          
                          {/* Website Content */}
                          <div className="h-96 sm:h-[500px] md:h-[600px] lg:h-[700px] relative">
                            <iframe
                              src={message.website.url}
                              title={message.website.title}
                              className="w-full h-full border-0 bg-white"
                              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                              loading="lazy"
                            />
                            {/* Loading Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-purple-rain/5 pointer-events-none"></div>
                          </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-sm text-gray-300 leading-relaxed">{message.website.description}</p>
                            <div className="mt-2 flex items-center space-x-4 text-xs text-gray-400">
                              <span className="inline-flex items-center space-x-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                                <span>Portfolio</span>
                              </span>
                              <span className="inline-flex items-center space-x-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span>Interactive</span>
                              </span>
                            </div>
                          </div>
                          <a 
                            href={message.website.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-electric-blue to-purple-rain text-white rounded-xl hover:from-purple-rain hover:to-neon-pink transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:shadow-electric-blue/25 hover:-translate-y-0.5"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Open Full Site</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
                
                {/* Display Certifications */}
                {message.certifications && message.certifications.length > 0 && (
                  <div className="mt-6 w-full">
                    <div className="space-y-4">
                      {message.certifications.map((cert, index) => (
                        <motion.div 
                          key={cert.id} 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group w-full"
                        >
                          <div className="glass-effect rounded-2xl p-6 border border-border-glow hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                            <div className="flex flex-col lg:flex-row gap-6">
                              {/* Certification Icon & Badge */}
                              <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                  </svg>
                                </div>
                                <div className="mt-2 text-center">
                                  <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
                                    {cert.issuer}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Certification Content */}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors duration-300">
                                  {cert.title}
                                </h4>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                  {cert.description}
                                </p>
                                
                                {/* Action Button */}
                                <div className="flex items-center justify-between">
                                  <a 
                                    href={cert.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5"
                                  >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                    <span>View Certificate</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                  
                                  <div className="text-xs text-gray-400">
                                    <span className="inline-flex items-center space-x-1">
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                      </svg>
                                      <span>Verified</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Display Articles */}
                {message.articles && message.articles.length > 0 && (
                  <div className="mt-6 w-full">
                    <div className="space-y-4">
                      {message.articles.map((article, index) => (
                        <motion.div 
                          key={article.id} 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group w-full"
                        >
                          <div className="glass-effect rounded-2xl p-6 border border-border-glow hover:border-electric-blue transition-all duration-300 hover:shadow-xl hover:shadow-electric-blue/10">
                            <div className="flex flex-col lg:flex-row gap-6">
                              {/* Article Icon & Badge */}
                              <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
                                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
                                  </svg>
                                </div>
                                <div className="mt-2 text-center">
                                  <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-medium rounded-full border border-orange-500/30">
                                    Medium
                                  </span>
                                </div>
                              </div>
                              
                              {/* Article Content */}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-electric-blue transition-colors duration-300">
                                  {article.title}
                                </h4>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                  {article.description}
                                </p>
                                
                                {/* Action Button */}
                                <div className="flex items-center justify-between">
                                  <a 
                                    href={article.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:shadow-orange-500/25 hover:-translate-y-0.5"
                                  >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
                                    </svg>
                                    <span>Read Article</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                  
                                  <div className="text-xs text-gray-400">
                                    <span className="inline-flex items-center space-x-1">
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                      </svg>
                                      <span>5 min read</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm">{message.content}</p>
            )}
          </div>

          {/* Media Content */}
          {message.media && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-cloud-white rounded-xl p-4 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-3">
                {message.media.type === 'video' && <Video className="w-5 h-5 text-sky-blue" />}
                {message.media.type === 'image' && <Image className="w-5 h-5 text-grass-green" />}
                {message.media.type === 'document' && <FileText className="w-5 h-5 text-sarya-purple" />}
                <span className="font-medium text-deep-brown">{message.media.title}</span>
              </div>
              
              {message.media.type === 'video' && (
                <div className="relative">
                  {message.media.videoId ? (
                    // YouTube video
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${message.media.videoId}`}
                        title={message.media.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    // Regular video file
                    <video
                      controls
                      className="w-full rounded-lg"
                      poster={message.media.thumbnail}
                    >
                      <source src={message.media.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
              
              {message.media.type === 'image' && (
                <img
                  src={message.media.url}
                  alt={message.media.title}
                  className="w-full rounded-lg"
                />
              )}
              
              {message.media.type === 'document' && (
                <div className="flex items-center justify-between p-3 bg-soft-lavender rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-sarya-purple" />
                    <div>
                      <p className="font-medium text-deep-brown">{message.media.title}</p>
                      <p className="text-sm text-gray-600">{message.media.description}</p>
                    </div>
                  </div>
                  <a
                    href={message.media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-sarya-purple hover:bg-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </motion.div>
          )}

          {/* Suggestions */}
          {message.suggestions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 p-4 bg-gradient-to-r from-soft-lavender/30 to-cloud-white rounded-xl border border-gray-100"
            >
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-sarya-purple" />
                <span className="text-sm font-medium text-deep-brown">You might also want to ask:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {message.suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    onClick={() => onSuggestionClick(suggestion)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-white border border-sarya-purple/20 text-sarya-purple text-sm rounded-full hover:bg-sarya-purple hover:text-white hover:border-sarya-purple transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Timestamp */}
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
