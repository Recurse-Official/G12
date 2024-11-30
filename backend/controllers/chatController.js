const Chat = require("../models/Chat");

const askChatbot = async (req, res) => {
  const { message, userId } = req.body;

  try {
    if (!message) return res.status(400).json({ message: "Message is required" });

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 150,
    });

    const chatbotResponse = response.data.choices[0].text.trim();

    // Save chat to database
    const chat = await Chat.create({
      user: userId,
      message,
      response: chatbotResponse,
    });

    res.status(200).json({ message: chatbotResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Chatbot error" });
  }
};
