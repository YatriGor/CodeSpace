import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './components/App';
import LandingPage from './components/LandingPage';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router basename="/Code-Editor-React">
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/editor" element={<App />} />
    </Routes>
  </Router>
);
