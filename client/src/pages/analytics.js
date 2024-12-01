// src/pages/Analytics.js

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [sentimentData, setSentimentData] = useState([]);

  useEffect(() => {
    // Fetch the chat data with sentiment analysis
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get-chat-history', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        setSentimentData(data);
      } catch (err) {
        console.error('Error fetching chat data', err);
      }
    };

    fetchData();
  }, []);

  // Chart.js data structure
  const chartData = {
    labels: sentimentData.map((chat) => new Date(chat.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'User Sentiment',
        data: sentimentData.map((chat) => chat.userSentiment),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
      {
        label: 'Bot Sentiment',
        data: sentimentData.map((chat) => chat.botSentiment),
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
      },
    ],
  };

  return (
    <div className="analytics-page">
      <h2>Chat Analytics</h2>
      <div className="chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Analytics;
