// chatbotRoutes.js or server.js

const express = require('express');
const router = express.Router();
const Sentiment = require('sentiment'); // Sentiment analysis library
const Chat = require('../models/Chat'); // MongoDB model for chat data

const sentiment = new Sentiment();

// Route for storing chat data
router.post('/api/save-chat', async (req, res) => {
  const { userMessage, botResponse } = req.body;

  // Analyze sentiment
  const sentimentScore = sentiment.analyze(userMessage).score;  // Sentiment score based on user's message
  const botSentimentScore = sentiment.analyze(botResponse).score; // Sentiment score based on bot's response

  try {
    const newChat = new Chat({
      userMessage,
      botResponse,
      userSentiment: sentimentScore,
      botSentiment: botSentimentScore,
      timestamp: new Date(),
    });

    await newChat.save();

    res.status(200).json({ message: "Chat saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving chat data" });
  }
});

// chatbotRoutes.js or server.js

router.get('/api/get-chat-history', async (req, res) => {
    try {
      const chats = await Chat.find()
        .sort({ timestamp: -1 }) // Get most recent chats first
        .limit(10); // Limit to the last 10 chats
  
      res.status(200).json(chats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching chat data' });
    }
  });

  // chatbotRoutes.js or server.js

router.get('/api/chat-history/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const chats = await Chat.find({ userId })
        .sort({ timestamp: -1 })
        .limit(10); // Fetch last 10 chats for the user
  
      res.status(200).json(chats);
    } catch (err) {
      console.error('Error fetching chat history:', err);
      res.status(500).json({ message: 'Error fetching chat history' });
    }
  });
  
  

module.exports = router;
