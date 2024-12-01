import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import './Chatbot.css'; // Make sure the styling is applied

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [micActive, setMicActive] = useState(false);
  const navigate = useNavigate();

  // Dummy data for previous chats
  const dummyChats = [
    "Session 1: How are you?",
    "Session 2: Tell me a joke.",
    "Session 3: What's the weather like?",
  ];

  // Get the speech-to-text transcription
  const { transcript, resetTranscript } = useSpeechRecognition();

  // Check if user is logged in (via token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/chatbot"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  // Function to handle sending a message to the chatbot
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() === "") return;

    const newMessage = { sender: "user", text: message };
    setChatHistory([...chatHistory, newMessage]);
    setMessage("");
  

    // Call OpenAI API for chatbot response
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      const botMessage = { sender: "bot", text: data.reply };
      setChatHistory([...chatHistory, newMessage, botMessage]);

      // Call the TTS function to speak the bot's response
      speakText(data.reply);
    } catch (error) {
      setChatHistory([
        ...chatHistory,
        newMessage,
        { sender: "bot", text: "Sorry, there was an error." },
      ]);
    }
    speakText("data reply");
  };
  
  // Function to handle TTS (Text-to-Speech)
  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';  // You can adjust the language and voice
    window.speechSynthesis.speak(speech);
  };

  // Start/Stop speech-to-text
  const handleMicToggle = () => {
    if (micActive) {
      SpeechRecognition.stopListening();
      setMessage(transcript);  // Set the final transcription to the message
      resetTranscript();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
    setMicActive(!micActive);
  };

  // Display the conversation (user and bot messages)
  const renderChatHistory = () => {
    return chatHistory.map((msg, index) => (
      <div
        key={index}
        className={msg.sender === "user" ? "user-message" : "bot-message"}
      >
        <p>{msg.text}</p>
      </div>
    ));
  };

  return (
    <div className="chatbot-container">
      {/* Left-side: Previous chats (dummy data) */}
      <div className="previous-chats">
        <h3>Previous Chats</h3>
        <ul>
          {dummyChats.map((chat, index) => (
            <li key={index}>{chat}</li>
          ))}
        </ul>
      </div>

      {/* Center Section */}
      <div className="chat-main">
        <div className="mic-circle-container">
          {/* Mic Circle */}
          <div
            className={`mic-circle ${micActive ? "active" : ""}`}
            onClick={handleMicToggle}
          >
            <span>{micActive ? "🟢" : "🔴"}</span> {/* Green or Red Mic */}
          </div>
        </div>

        {/* Conversation Box */}
        <div className="conversation-box">
          {renderChatHistory()}
        </div>

        {/* Message Input (with live transcription) */}
        <form onSubmit={handleSendMessage} className="chat-form">
          <textarea
            type="text"
            value={micActive ? transcript : message}  // Display transcript if mic is on
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type or speak your message..."
          />
          <div className="send-button-container">
            {/* Mic button and Send button side by side */}
            <button
              type="button"
              className="mic-button"
              onClick={handleMicToggle}
            >
              {micActive ? "Stop Mic" : "Start Mic"}
            </button>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>

      {/* End Chat Button (on the other side) */}
      <div className="end-chat-button-container">
        <button onClick={() => navigate("/analytics")} className="end-chat-button">
          End Chat
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
