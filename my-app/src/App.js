// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import BookingPage from './components/BookingPage'; // Import BookingPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book/:flightId" element={<BookingPage />} /> {/* Route for booking */}
      </Routes>
    </Router>
  );
}

export default App;