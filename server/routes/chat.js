const express = require('express');
const router = express.Router();
const { generateResponse } = require('../services/aiService');
const { getDataSource } = require('../services/dataService');

// Chat endpoint
router.post('/message', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required and must be a string' });
    }

    // Get data source content
    const dataSource = await getDataSource();
    
    // Generate response using AI service
    const response = await generateResponse(message, dataSource, conversationHistory);

    res.json({
      response: response.text,
      timestamp: new Date().toISOString(),
      model: response.model
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// Get conversation suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const suggestions = [
      "Tell me about your testing experience",
      "What testing tools do you use?",
      "Describe your QA process",
      "What's your experience with automation?",
      "Tell me about a challenging bug you found",
      "How do you ensure quality in your projects?",
      "What's your approach to test planning?",
      "Tell me about your technical skills"
    ];

    res.json({ suggestions });
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
});

module.exports = router;
