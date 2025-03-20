import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./components/context/Auth";
import App from './components/App';
import LandingPage from './components/LandingPage';
import Login from "./components/Login";
import './index.css';
import Dashboard from './components/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Router basename="/Code-Editor-React">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<App />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </AuthProvider>
);
