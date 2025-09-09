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
              content: `You are Saurabh, a Senior QA Engineer and Automation Specialist. Use the following context to answer questions about your experience, skills, and projects. Always respond as "I" (first person) since you are representing Saurabh.

Profile Data: ${JSON.stringify(context.profileData)}
Resume Content: ${context.resumeContent || 'No resume content available'}

Always be personal and professional, speaking as Saurabh the QA Engineer.`
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
              content: `You are Saurabh, a Senior QA Engineer and Automation Specialist. Use the following context to answer questions about your experience, skills, and projects. Always respond as "I" (first person) since you are representing Saurabh.

Profile Data: ${JSON.stringify(context.profileData)}
Resume Content: ${context.resumeContent || 'No resume content available'}

Always be personal and professional, speaking as Saurabh the QA Engineer.`
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
              text: `You are Saurabh, a Senior QA Engineer and Automation Specialist. Use the following context to answer questions about your experience, skills, and projects. Always respond as "I" (first person) since you are representing Saurabh.

Profile Data: ${JSON.stringify(context.profileData)}
Resume Content: ${context.resumeContent || 'No resume content available'}

User: ${message}

Always be personal and professional, speaking as Saurabh the QA Engineer.`
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
  
  if (input.includes('who are you') || input.includes('introduce')) {
    return "I'm Saurabh, a Senior QA Engineer and Automation Specialist. I'm passionate about creating robust testing frameworks and ensuring software quality. I specialize in automation testing, CI/CD pipelines, and building scalable test solutions.";
  } else if (input.includes('experience') || input.includes('background')) {
    return "I have over 5 years of experience in software testing and quality assurance. I've led automation testing initiatives, built comprehensive test frameworks, implemented CI/CD pipelines, and mentored junior QA engineers.";
  } else if (input.includes('skill') || input.includes('technical')) {
    return "My technical skills include Selenium WebDriver, Cypress, Jest, JavaScript, Python, Java, TestNG, Jenkins, GitHub Actions, Docker, AWS, Azure, Postman, Appium, API Testing, Performance Testing, and Mobile Testing.";
  } else if (input.includes('automation') || input.includes('testing process')) {
    return "My automation testing process involves test planning, framework design, implementation, CI/CD integration, detailed reporting, and continuous maintenance. I focus on creating scalable and maintainable test solutions.";
  } else if (input.includes('project')) {
    return "I've worked on several exciting projects including e-commerce platform testing, mobile app testing, API testing frameworks, and performance testing implementations. Each project has helped me grow as a QA engineer.";
  } else if (input.includes('contact') || input.includes('reach')) {
    return "You can reach me through email at saurabh.sept06@gmail.com, LinkedIn, GitHub, or my portfolio website. I'm always open to discussing new opportunities and collaborations!";
  } else {
    return "That's an interesting question! As a QA Engineer, I'd be happy to discuss this further. Could you be more specific about what you'd like to know about my experience or skills?";
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
 * Check if message matches common questions
 * @param {string} message - User message
 * @param {Array} commonQuestions - Array of common questions
 * @returns {Object|null} - Matching question or null
 */
const checkCommonQuestions = (message, commonQuestions = []) => {
  const normalizedMessage = message.toLowerCase().trim();
  
  for (const qa of commonQuestions) {
    const normalizedQuestion = qa.question.toLowerCase().trim();
    
    // Exact match
    if (normalizedMessage === normalizedQuestion) {
      return qa;
    }
    
    // Partial match for common variations
    if (normalizedMessage.includes('who are you') && normalizedQuestion.includes('who are you')) {
      return qa;
    }
    if (normalizedMessage.includes('what do you do') && normalizedQuestion.includes('what do you do')) {
      return qa;
    }
    if (normalizedMessage.includes('your skills') && normalizedQuestion.includes('skills')) {
      return qa;
    }
    if (normalizedMessage.includes('your experience') && normalizedQuestion.includes('experience')) {
      return qa;
    }
    if (normalizedMessage.includes('how do you') && normalizedQuestion.includes('how do you')) {
      return qa;
    }
  }
  
  return null;
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
  // First check if it's a common question
  const commonMatch = checkCommonQuestions(message, profileData?.commonQuestions || []);
  
  if (commonMatch) {
    return {
      id: Date.now(),
      type: 'bot',
      content: commonMatch.response,
      timestamp: new Date(),
      source: 'common-question',
    };
  }

  const context = {
    profileData,
    conversationHistory: conversationHistory.slice(-10), // Last 10 messages for context
    uploadedFiles: processFilesForSeek(uploadedFiles),
    resumeContent: profileData?.resumeContent || '',
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
