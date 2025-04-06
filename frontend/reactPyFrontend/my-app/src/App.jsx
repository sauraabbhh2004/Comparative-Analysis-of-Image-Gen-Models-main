import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageUpload from './components/ImageUpload.jsx';
import LandingPage from './components/LandingPage.jsx';
import PromptDisplay from './components/PromptDisplay.jsx';
import ImageDisplay from './components/ImageDisplay.jsx';
import ResultDisplay from './components/ResultDisplay.jsx';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/upload-image" element={<ImageUpload />} />
          <Route exact path="/prompt" element={<PromptDisplay />} />
          <Route exact path="/generated-image" element={<ImageDisplay />} />
          <Route exact path="/results" element={<ResultDisplay />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    );
  }
}

export default App
