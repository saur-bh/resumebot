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
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-sarya-purple' 
            : 'bg-white border-2 border-sarya-purple'
        }`}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <img 
              src="/myphoto.png" 
              alt="Saurabh QA" 
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
          )}
        </div>

        {/* Message Content */}
        <div className={`${isUser ? 'items-end' : 'items-start'} flex flex-col space-y-2`}>
          <div className={`chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}`}>
            {isBot ? (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-none mb-3 space-y-2">{children}</ul>,
                    li: ({ children }) => <li className="text-sm flex items-start space-x-2">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-deep-brown">{children}</strong>,
                    code: ({ children }) => (
                      <code className="bg-gray-100 text-sarya-purple px-1 py-0.5 rounded text-xs">
                        {children}
                      </code>
                    ),
                    a: ({ href, children }) => (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sarya-purple hover:text-accent-purple underline decoration-2 underline-offset-2 hover:decoration-accent-purple transition-all duration-200"
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
                  <div className="mt-4 space-y-4">
                    {message.videos.map((video) => (
                      <div key={video.id} className="border border-gray-200 rounded-xl p-4 bg-gradient-to-r from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex items-start space-x-4">
                          {/* YouTube Thumbnail */}
                          <div className="relative flex-shrink-0">
                            <a 
                              href={video.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <img
                                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                                alt={video.title}
                                className="w-48 h-36 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                onError={(e) => {
                                  e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                                }}
                              />
                              {/* Play Button Overlay */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors">
                                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                              </div>
                            </a>
                          </div>
                          
                          {/* Video Info */}
                          <div className="flex-1">
                            <h4 className="font-semibold text-deep-brown text-lg mb-2 leading-tight">{video.title}</h4>
                            <p className="text-gray-600 text-sm mb-3">Click the thumbnail to watch on YouTube</p>
                            <a 
                              href={video.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg>
                              <span>Watch on YouTube</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
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
                
                {/* Display Articles */}
                {message.articles && message.articles.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {message.articles.map((article) => (
                      <div key={article.id} className="border border-gray-200 rounded-xl p-4 bg-gradient-to-r from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-deep-brown text-lg mb-2 leading-tight">{article.title}</h4>
                            <p className="text-gray-600 text-sm mb-3">{article.description}</p>
                            <a 
                              href={article.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
                              </svg>
                              <span>Read on Medium</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
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
