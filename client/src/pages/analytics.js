import React, { useState, useEffect } from "react";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    // Fetch the analytics data from the backend
    fetch("http://localhost:5000/api/analytics", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setAnalyticsData(data))
      .catch((err) => console.error("Error fetching analytics:", err));
  }, []);

  return (
    <div className="analytics-page">
      <h2>Chatbot Analytics</h2>
      {analyticsData ? (
        <div>
          <h3>Conversation Summary</h3>
          <p>Messages Sent: {analyticsData.messagesSent}</p>
          <p>Mood: {analyticsData.mood}</p>
          <p>Word Count: {analyticsData.wordCount}</p>
        </div>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
};

export default Analytics;
