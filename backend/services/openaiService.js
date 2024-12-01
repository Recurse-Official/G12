const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function chatWithBot(userMessage) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",  // Or any other model like 'gpt-3.5-turbo'
      messages: [{ role: "user", content: userMessage }],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error while interacting with OpenAI:", error);
    return "Sorry, I couldn't process your request at the moment.";
  }
}

module.exports = { chatWithBot };
