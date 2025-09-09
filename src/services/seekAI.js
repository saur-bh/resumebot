// AI Integration Service
// This file contains the integration logic for multiple AI providers

const API_ENDPOINTS = {
  openai: 'https://api.openai.com/v1/chat/completions',
  gemini: 'https://generativelanguage.googleapis.com/v1beta/models',
  deepseek: 'https://api.deepseek.com/v1/chat/completions'
};

/**
 * Send a message to AI provider and get a response
 * @param {string} message - The user's message
 * @param {Object} context - Additional context (profile data, conversation history)
 * @param {Object} apiSettings - API configuration
 * @returns {Promise<Object>} - AI response
 */
export const sendToAI = async (message, context = {}, apiSettings = {}) => {
  const { provider = 'openai', apiKey = '', model = 'gpt-3.5-turbo' } = apiSettings;
  
  if (!apiKey) {
    return {
      success: false,
      error: 'API key not configured',
      fallback: generateFallbackResponse(message),
    };
  }

  try {
    let requestBody;
    let headers = {
      'Content-Type': 'application/json',
    };

    switch (provider) {
      case 'openai':
        headers['Authorization'] = `Bearer ${apiKey}`;
        requestBody = {
          model: model,
          messages: [
            {
              role: 'system',
              content: `You are a helpful assistant representing a professional. Use the following context to answer questions about their experience, skills, and projects: ${JSON.stringify(context.profileData)}`
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        };
        break;

      case 'deepseek':
        headers['Authorization'] = `Bearer ${apiKey}`;
        requestBody = {
          model: model,
          messages: [
            {
              role: 'system',
              content: `You are a helpful assistant representing a professional. Use the following context to answer questions about their experience, skills, and projects: ${JSON.stringify(context.profileData)}`
            },
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        };
        break;

      case 'gemini':
        requestBody = {
          contents: [{
            parts: [{
              text: `Context: ${JSON.stringify(context.profileData)}\n\nUser: ${message}\n\nRespond as a helpful assistant representing this professional.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        };
        break;

      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }

    const response = await fetch(API_ENDPOINTS[provider], {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`${provider} API error: ${response.status}`);
    }

    const data = await response.json();
    let content;

    switch (provider) {
      case 'openai':
      case 'deepseek':
        content = data.choices[0].message.content;
        break;
      case 'gemini':
        content = data.candidates[0].content.parts[0].text;
        break;
      default:
        content = 'Response received but format not recognized';
        break;
    }

    return {
      success: true,
      content,
      usage: data.usage || {},
    };
  } catch (error) {
    console.error(`Error calling ${provider} AI:`, error);
    return {
      success: false,
      error: error.message,
      fallback: generateFallbackResponse(message),
    };
  }
};

/**
 * Generate a fallback response when Seek AI is unavailable
 * @param {string} message - The user's message
 * @returns {string} - Fallback response
 */
const generateFallbackResponse = (message) => {
  const input = message.toLowerCase();
  
  if (input.includes('experience') || input.includes('background')) {
    return "I have extensive experience in software testing and automation. I specialize in creating robust test frameworks, implementing CI/CD pipelines, and ensuring high-quality software delivery.";
  } else if (input.includes('skill') || input.includes('technical')) {
    return "My technical skills include testing frameworks like Selenium and Cypress, programming languages like JavaScript and Python, and cloud platforms like AWS and Azure.";
  } else if (input.includes('automation') || input.includes('testing process')) {
    return "My automation testing process involves test planning, framework design, implementation, CI/CD integration, reporting, and continuous maintenance.";
  } else if (input.includes('project')) {
    return "I've worked on several exciting projects including e-commerce platform testing, mobile app testing, API testing frameworks, and performance testing implementations.";
  } else if (input.includes('contact') || input.includes('reach')) {
    return "You can reach me through email, LinkedIn, GitHub, or my portfolio website. I'm always open to discussing new opportunities!";
  } else {
    return "That's an interesting question! I'd be happy to discuss this further. Could you be more specific about what you'd like to know?";
  }
};

/**
 * Process uploaded files for Seek AI context
 * @param {Array} files - Array of uploaded files
 * @returns {Object} - Processed file context
 */
export const processFilesForSeek = (files) => {
  const processedFiles = files.map(file => ({
    name: file.name,
    type: file.type,
    size: file.size,
    url: file.url,
    description: generateFileDescription(file),
  }));

  return {
    totalFiles: files.length,
    files: processedFiles,
    summary: generateFileSummary(processedFiles),
  };
};

/**
 * Generate a description for a file
 * @param {Object} file - File object
 * @returns {string} - File description
 */
const generateFileDescription = (file) => {
  if (file.type === 'video') {
    return `Video demonstration: ${file.name}`;
  } else if (file.type === 'image') {
    return `Image: ${file.name}`;
  } else if (file.type === 'document') {
    return `Document: ${file.name}`;
  }
  return `File: ${file.name}`;
};

/**
 * Generate a summary of all files
 * @param {Array} processedFiles - Processed files array
 * @returns {string} - File summary
 */
const generateFileSummary = (processedFiles) => {
  const videoCount = processedFiles.filter(f => f.type === 'video').length;
  const imageCount = processedFiles.filter(f => f.type === 'image').length;
  const docCount = processedFiles.filter(f => f.type === 'document').length;

  let summary = `Available resources: `;
  const parts = [];
  
  if (videoCount > 0) parts.push(`${videoCount} video${videoCount > 1 ? 's' : ''}`);
  if (imageCount > 0) parts.push(`${imageCount} image${imageCount > 1 ? 's' : ''}`);
  if (docCount > 0) parts.push(`${docCount} document${docCount > 1 ? 's' : ''}`);
  
  return summary + parts.join(', ');
};

/**
 * Enhanced message processing with AI
 * @param {string} message - User message
 * @param {Object} profileData - User profile data
 * @param {Array} conversationHistory - Previous messages
 * @param {Array} uploadedFiles - User's uploaded files
 * @returns {Promise<Object>} - Enhanced response
 */
export const processMessageWithAI = async (message, profileData, conversationHistory, uploadedFiles) => {
  const context = {
    profileData,
    conversationHistory: conversationHistory.slice(-10), // Last 10 messages for context
    uploadedFiles: processFilesForSeek(uploadedFiles),
  };

  const apiSettings = profileData?.apiSettings || {};
  const aiResponse = await sendToAI(message, context, apiSettings);
  
  if (aiResponse.success) {
    return {
      id: Date.now(),
      type: 'bot',
      content: aiResponse.content,
      timestamp: new Date(),
      source: apiSettings.provider || 'ai',
      usage: aiResponse.usage,
    };
  } else {
    // Fallback to local response
    return {
      id: Date.now(),
      type: 'bot',
      content: aiResponse.fallback,
      timestamp: new Date(),
      source: 'fallback',
      error: aiResponse.error,
    };
  }
};

const aiService = {
  sendToAI,
  processFilesForSeek,
  processMessageWithAI,
};

export default aiService;
