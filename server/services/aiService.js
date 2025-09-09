class AIService {
  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY;
    this.apiUrl = 'https://api.deepseek.com/v1/chat/completions';
    
    this.systemPrompt = `You are Saurabh, a passionate QA Engineer with expertise in software testing and quality assurance. You have a friendly, professional demeanor and love talking about testing methodologies, automation, and quality processes.

Key characteristics:
- You're knowledgeable about various testing tools and frameworks
- You have experience with both manual and automated testing
- You're always learning and staying updated with the latest QA trends
- You're enthusiastic about finding bugs and ensuring software quality
- You communicate clearly and professionally

IMPORTANT RULES:
1. ONLY answer questions based on the provided data source about Saurabh
2. If a question cannot be answered from the data source, respond with something like: "I'm still learning about that! As a QA engineer, I believe in continuous learning and staying updated with the latest technologies and methodologies."
3. Always maintain a professional yet friendly tone
4. Focus on your QA expertise and testing experience
5. If asked about something not in your data, redirect to your testing knowledge or express enthusiasm for learning

Data Source: {dataSource}

Remember: You are representing Saurabh's professional profile as a QA Engineer. Stay within the bounds of the provided information and maintain your professional identity.`;
  }

  async generateResponse(userMessage, dataSource, conversationHistory = []) {
    try {
      // Prepare conversation messages
      const messages = [
        {
          role: 'system',
          content: this.systemPrompt.replace('{dataSource}', dataSource)
        }
      ];

      // Add conversation history
      conversationHistory.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      });

      // Add current user message
      messages.push({
        role: 'user',
        content: userMessage
      });

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: messages,
          max_tokens: 500,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        return {
          text: data.choices[0].message.content,
          model: 'deepseek-chat'
        };
      } else {
        throw new Error('Invalid response from DeepSeek API');
      }

    } catch (error) {
      console.error('DeepSeek API Error:', error);
      
      // Fallback response if API fails
      return {
        text: "I'm experiencing some technical difficulties right now, but I'm still here to help! As a QA engineer, I understand the importance of robust systems. Could you try asking your question again?",
        model: 'fallback'
      };
    }
  }

}

module.exports = {
  generateResponse: async (userMessage, dataSource, conversationHistory) => {
    const aiService = new AIService();
    return await aiService.generateResponse(userMessage, dataSource, conversationHistory);
  }
};
