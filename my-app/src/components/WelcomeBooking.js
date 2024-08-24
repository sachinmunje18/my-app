// src/components/WelcomeBooking.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeBooking.css'; // Optional: Add styling if needed

function WelcomeBooking() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/dashboard'); // Navigate to the dashboard page
  };

  const handleViewBookings = () => {
    navigate('/view-booking'); // Navigate to the view bookings page
  };

  return (
    <div className="welcome-booking-container">
      <h1>Thank You for Booking!</h1>
      <p>Your booking was successful. We look forward to seeing you on your trip.</p>
      <button onClick={handleHome}>Go to Dashboard</button>
      <button onClick={handleViewBookings}>See Your Bookings</button>
    </div>
  );
}

export default WelcomeBooking;
