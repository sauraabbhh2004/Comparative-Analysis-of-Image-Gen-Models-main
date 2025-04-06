import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PromptDisplay.css';

const PromptDisplay = () => {
  const [receivedPrompt, setReceivedPrompt] = useState('');

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/generated-prompt');
        setReceivedPrompt(response.data.prompt);
      } catch (error) {
        console.error('Error fetching prompt:', error);
      }
    };

    fetchPrompt();
  }, []);

  return (
    <div className="prompt-page">
      <div className="navbar">
        <Link to="/">
          <div className="logo">Matching Models</div>
        </Link>
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>

      <div className="prompt-section">
        <div className="prompt-text">
          <h1>Received Prompt:</h1>
          <p>{receivedPrompt || 'Loading prompt...'}</p>
          <Link to="/generated-image">
            <button className="confirm-btn">Confirm</button>
          </Link>
        </div>
      </div>

      <footer className="footer-section">
        <p>&copy; 2024 Prompt Generator | <a href="#contact">Contact Us</a></p>
      </footer>
    </div>
  );
};

export default PromptDisplay;