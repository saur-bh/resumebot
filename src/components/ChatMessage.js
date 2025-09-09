import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, FileText, Video, Image, ExternalLink } from 'lucide-react';
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
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-sarya-purple' 
            : 'bg-gradient-to-r from-sky-blue to-grass-green'
        }`}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div className={`${isUser ? 'items-end' : 'items-start'} flex flex-col space-y-2`}>
          <div className={`chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}`}>
            {isBot ? (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                    li: ({ children }) => <li className="text-sm">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-deep-brown">{children}</strong>,
                    code: ({ children }) => (
                      <code className="bg-gray-100 text-sarya-purple px-1 py-0.5 rounded text-xs">
                        {children}
                      </code>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
                
                {/* Display Videos */}
                {message.videos && message.videos.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {message.videos.map((video) => (
                      <div key={video.id} className="border border-gray-200 rounded-lg p-3 bg-white">
                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center">
                            <Video className="w-6 h-6 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-deep-brown text-sm">{video.title}</h4>
                            <a 
                              href={video.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sarya-purple text-xs hover:underline flex items-center space-x-1"
                            >
                              <span>Watch on YouTube</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                        <div className="mt-2">
                          <iframe
                            width="100%"
                            height="200"
                            src={`https://www.youtube.com/embed/${video.videoId}`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded"
                          ></iframe>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Display Articles */}
                {message.articles && message.articles.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {message.articles.map((article) => (
                      <div key={article.id} className="border border-gray-200 rounded-lg p-3 bg-white">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                            <FileText className="w-6 h-6 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-deep-brown text-sm">{article.title}</h4>
                            <p className="text-gray-600 text-xs mt-1">{article.description}</p>
                            <a 
                              href={article.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sarya-purple text-xs hover:underline flex items-center space-x-1 mt-2"
                            >
                              <span>Read on Medium</span>
                              <ExternalLink className="w-3 h-3" />
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
              className="flex flex-wrap gap-2 mt-2"
            >
              {message.suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => onSuggestionClick(suggestion)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3 py-1.5 bg-soft-lavender hover:bg-opacity-80 text-deep-brown text-sm rounded-full transition-colors border border-gray-200"
                >
                  {suggestion}
                </motion.button>
              ))}
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
