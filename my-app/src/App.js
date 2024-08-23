// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import BookingPage from './components/BookingPage'; // Import BookingPage
import BookingListPage from './components/BookingListPage'; // Import BookingListPage
import UpdateBookingPage from './components/UpdateBookingPage'; // Import UpdateBookingPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book/:flightId" element={<BookingPage />} /> {/* Route for booking */}
        <Route path="/bookings" element={<BookingListPage />} /> {/* Route for booking list */}
        <Route path="/update-booking/:id" element={<UpdateBookingPage />} /> {/* Route for updating booking */}
      </Routes>
    </Router>
  );
}

export default App;
