import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ResultDisplay.css'; // Import your CSS file for styling

const ResultDisplay = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [initialImageSrc, setInitialImageSrc] = useState('');
  const [generatedImageSrc, setGeneratedImageSrc] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/results');
        const resData = response.data;
        setData(resData);
        console.log(data)

        // Convert hex blobs back to Uint8Array
        const initialImageBlob = new Uint8Array(resData.initial_image.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const generatedImageBlob = new Uint8Array(resData.generated_image.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

        // Create object URLs for the images
        const initialImageUrl = URL.createObjectURL(new Blob([initialImageBlob.buffer], { type: 'image/png' }));
        const generatedImageUrl = URL.createObjectURL(new Blob([generatedImageBlob.buffer], { type: 'image/jpeg' }));

        setInitialImageSrc(initialImageUrl);
        setGeneratedImageSrc(generatedImageUrl);

      } catch (err) {
        setError('Error fetching data: ' + err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="result-page">
      {/* Navbar */}
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

      {/* Result Display Section */}
      <div className="result-section">
        <div className="hero-text">
          <h1>Image Similarity Results</h1>
          <p>Here are the scores comparing your images from different models.</p>
        </div>

        <div className="image-container">
          <img src={initialImageSrc} alt="Initial" className="image" />
          <img src={generatedImageSrc} alt="Generated" className="image" />
        </div>

        <div className="scores">
          <p><strong>Model Used:</strong> {data.model}</p>
          <p><strong>Global Contrast Similarity:</strong> {data.global_contrast_sim}</p>
          <p><strong>Local Contrast Similarity:</strong> {data.local_contrast_sim}</p>
          <p><strong>Label Similarity:</strong> {data.label_sim}</p>
          <p><strong>Texture Similarity:</strong> {data.texture_sim}</p>
          <p><strong>ResNet Similarity:</strong> {data.restnet_sim}</p>
          <p><strong>Aggregated Similarity:</strong> {data.aggregated_sim}</p>
        </div>
      </div>
      <div>
        <br />
        <Link to="/dashboard">
          <button className="proceed">proceed</button>
        </Link>
        <br />
      </div>
      <br />
      {/* Footer */}
      <footer className="footer-section">
        <p>&copy; 2024 Generative Tools | <a href="#contact">Contact Us</a></p>
      </footer>
    </div>
  );
};

export default ResultDisplay;
