const express = require("express");
const router = express.Router();

// A simple mock-up of chatbot logic
router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Please provide a message." });
  }

  // For now, return a static response (you can integrate OpenAI later)
  const botResponse = `You said: ${message}. How can I assist you further?`;
  
  // You could also use OpenAI API here to generate responses
  res.json({ reply: botResponse });
});

module.exports = router;
