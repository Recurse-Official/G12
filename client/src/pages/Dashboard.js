import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <p>This is where you'll find your personalized mental health tools.</p>
      <Link to="/chat">Go to Chatbot</Link>
    </div>
  );
};

export default Dashboard;
