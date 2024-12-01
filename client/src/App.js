import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";           // Ensure you have a Home page
import Chatbot from "./components/Chatbot"; // Ensure you have the Chatbot component
import Login from "./pages/Login";         // Create this page
import Register from "./pages/Register";   // Create this page
import Forums from "./pages/Forums";
import Analytics from "./pages/analytics";
import Help from "./pages/Help";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
