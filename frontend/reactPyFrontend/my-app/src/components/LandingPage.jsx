import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="navbar">
        <div className="logo">Matching Models</div>
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="mailto:caim@gmail.com?subject=%7Badd%20query%20title%7D&body=%7Bproblem%20title%7D%0D%0A%0D%0A%7Bwrite%20your%20problem%20description%7D">Contact</a></li>
          </ul>
        </nav>
      </div>

      <div className="hero-section">
        <div className="hero-text">
          <h1>Get Score of Multiple Image Generation Models</h1>
          <p>Your go-to solution for comparing generated images from different models.</p>
          <Link to="/upload-image">
            <button className="get-started-btn">Get Started</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1495603491717-3d3374928dc6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Exercise tools" />
        </div>
      </div>

      <div className="features-section" id="features">
        <div className="feature">
          <h2>Multiple Models</h2>
          <p>Compare various image generation models.</p>
        </div>
        <div className="feature">
          <h2>Easy To Use</h2>
          <p>Minimal and simplistic UI for easier handling.</p>
        </div>
        <div className="feature">
          <h2>Join a Community</h2>
          <p>Connect with others to stay motivated and share achievements.</p>
        </div>
      </div>

      <footer className="footer-section">
        <p>&copy; 2024 Generative Tools | <a href="#contact">Contact Us</a></p>
      </footer>
    </div>
  );
};

export default LandingPage;
