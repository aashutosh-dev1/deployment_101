import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [deploymentInfo, setDeploymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeploymentInfo();
  }, []);

  const fetchDeploymentInfo = async () => {
    try {
      setLoading(true);
      // const response = await fetch('http://localhost:3001/api/deployment-info');
      const response = await fetch('https://deployment-101-m6ky.onrender.com/api/deployment-info');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setDeploymentInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading Deployment Basics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <h1 className="error-title">⚠️ Error</h1>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={fetchDeploymentInfo}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1 className="title">🚀 Deployment Basics</h1>
          <p className="subtitle">Full-Stack Application Demo</p>
        </div>
        
        <div className="content">
          <div className="info-card">
            <div className="card-header">
              <h2 className="card-title">API Response</h2>
              <div className="card-badge">Live Data</div>
            </div>
            
            <div className="card-content">
              <div className="info-item">
                <span className="info-label">Message:</span>
                <span className="info-value message">{deploymentInfo?.message}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Current Date:</span>
                <span className="info-value date">{deploymentInfo?.date ? formatDate(deploymentInfo.date) : 'N/A'}</span>
              </div>
            </div>
            
            <div className="card-footer">
              <button className="refresh-button" onClick={fetchDeploymentInfo}>
                🔄 Refresh Data
              </button>
            </div>
          </div>
          
          <div className="tech-stack">
            <h3>Tech Stack</h3>
            <div className="tech-items">
              <div className="tech-item">
                <span className="tech-icon">⚡</span>
                <span>Node.js + Express</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">⚛️</span>
                <span>React</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">🎨</span>
                <span>CSS3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
