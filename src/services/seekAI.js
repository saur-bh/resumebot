// AI Integration Service
// This file contains the integration logic for multiple AI providers

import { demoProfile } from '../data/demoProfile.js';

const API_ENDPOINTS = {
  openai: 'https://api.openai.com/v1/chat/completions',
  gemini: 'https://generativelanguage.googleapis.com/v1beta/models',
  deepseek: 'https://api.deepseek.com/v1/chat/completions'
};

// Keywords that indicate the question is about Saurabh's content
const SAURABH_KEYWORDS = [
  'saurabh', 'you', 'your', 'resume', 'experience', 'skills', 'testing', 'qa', 'automation',
  'cypress', 'selenium', 'playwright', 'appium', 'webdriverio', 'javascript', 'python',
  'api testing', 'mobile testing', 'ci/cd', 'github actions', 'circleci', 'jenkins',
  'postman', 'browserstack', 'testrigor', 'figma', 'product', 'development',
  'videos', 'youtube', 'medium', 'articles', 'website', 'portfolio', 'contact',
  'email', 'linkedin', 'github', 'download', 'resume'
];

/**
 * Check if message is about Saurabh's content
 * @param {string} message - User message
 * @returns {boolean} - True if about Saurabh's content
 */
const isAboutSaurabh = (message) => {
  const lowerMessage = message.toLowerCase();
  return SAURABH_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
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
  
  // If no API key or message is not about Saurabh, use fallback
  if (!apiKey || !isAboutSaurabh(message)) {
    return {
      success: false,
      error: apiKey ? 'Question outside my expertise' : 'API key not configured',
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
 * Generate a fallback response when AI is unavailable or question is outside expertise
 * @param {string} message - The user's message
 * @returns {string} - Fallback response
 */
const generateFallbackResponse = (message) => {
  const input = message.toLowerCase();
  
  // Check if it's about Saurabh's content
  if (isAboutSaurabh(message)) {
    // Check for video requests FIRST
    if (input.includes('video') || input.includes('youtube') || input.includes('show me') || input.includes('show') || input.includes('videos')) {
      return "I have several YouTube videos showcasing my testing style and automation work:\n\n1. **Cypress with CircleCI** - https://youtu.be/vE_4p5cLDco\n2. **Automating Bot using Simple JavaScript** - https://www.youtube.com/watch?v=hsghaUwMkbg\n3. **Mobile Automation using WebDriverIO** - https://youtu.be/1ODiJi2Sk6Y\n\nThese videos demonstrate my practical approach to automation testing and CI/CD integration.";
    } else if (input.includes('article') || input.includes('medium') || input.includes('written')) {
      return "I've written several Medium articles about testing and product development:\n\n1. **Test with Ease - Meet TestRigor** - https://medium.com/@_.saurabh/test-with-ease-meet-testrigor-e4960e56772d\n2. **Marvelous Tester - API Testing** - https://medium.com/@_.saurabh/marvelous-tester-24644dba1e95\n3. **Product Roadmap for Instamojo** - https://medium.com/@_.saurabh/product-roadmap-for-instamojo-3ebd5f892429\n\nThese articles cover testing tools, API testing strategies, and product roadmap planning.";
    } else if (input.includes('who are you') || input.includes('introduce')) {
      return "I'm Saurabh, a QA Engineer and Product Builder with 15+ years of experience in software testing and quality assurance. I specialize in automation frameworks, manual testing, and release management across web, mobile, and backend systems. I'm passionate about ensuring software quality and building robust testing solutions.";
    } else if (input.includes('experience') || input.includes('background')) {
      return "I have over 15+ years of experience in software testing and quality assurance. I've worked as a QA Engineer and Product Builder, ensuring software quality through manual testing, automation frameworks, and release management. I've led automation testing initiatives, built comprehensive test frameworks, implemented CI/CD pipelines, and contributed to end-to-end product development.";
    } else if (input.includes('skill') || input.includes('technical')) {
      return "My technical skills include Selenium WebDriver, Cypress, Playwright, Appium, WebDriverIO, Jest, JavaScript, Python, Java, TestNG, Jenkins, GitHub Actions, CircleCI, Docker, AWS, Azure, Postman, BrowserStack, API Testing, Performance Testing, Mobile Testing, Manual Testing, TestRigor, Figma Design Analysis, CI/CD Pipelines, and Release Management.";
    } else if (input.includes('automation') || input.includes('testing process')) {
      return "My testing approach involves creating structured QA processes, developing automation frameworks, implementing CI/CD pipelines, and ensuring bug-free releases. I focus on scalable and maintainable test solutions, working across web, mobile, and backend systems. I also analyze Figma designs, create user stories, and manage staging/production environments.";
    } else if (input.includes('project')) {
      return "I've worked on several exciting projects including e-commerce platform testing, mobile app testing, API testing frameworks, and performance testing implementations. Each project has helped me grow as a QA engineer and product builder.";
    } else if (input.includes('contact') || input.includes('reach')) {
      return "You can reach me through email at saurabh-verma@outlook.com, LinkedIn, GitHub, or my portfolio website at https://saur-bh.github.io/me/. I'm always open to discussing new opportunities and collaborations!";
    } else if (input.includes('website') || input.includes('portfolio')) {
      return "You can find more about me on my personal website at https://saur-bh.github.io/me/. It showcases my skills, experience, and projects. You can also find me on GitHub at https://github.com/saur-bh and Medium at https://medium.com/@_.saurabh.";
    } else if (input.includes('resume') || input.includes('download')) {
      return "Absolutely! 📄 You can download my resume by clicking the purple 'Resume' button in the header above. It's a comprehensive PDF with all my experience, skills, and projects.";
    } else {
      return "That's an interesting question! As a QA Engineer and Product Builder, I'd be happy to discuss this further. Could you be more specific about what you'd like to know about my experience, skills, or projects?";
    }
  } else {
    // Question is outside Saurabh's expertise
    return "I focus on my QA engineering experience, testing methodologies, and the content I've shared. For topics outside my expertise, I'd be happy to discuss them via email at saurabh-verma@outlook.com! 😊\n\nTry asking me about:\n• My testing experience and skills\n• My automation videos\n• My articles on Medium\n• My approach to testing\n• How to download my resume";
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
