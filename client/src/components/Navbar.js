import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";


const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/chatbot">Chatbot</Link>
        </li>
        <li>
          <Link to="/forums">Forums</Link>
        </li>
        <li>
          <Link to="/analytics">My Analytics</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
