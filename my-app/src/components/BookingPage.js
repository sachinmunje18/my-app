import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingPage.css'; // Import the CSS file for styling

function BookingPage() {
  const { flightId } = useParams(); // Get the flightId from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [flightNumber, setFlightNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to the backend to book the flight
      const response = await axios.post('http://localhost:8080/api/bookings', {
        flightId,
        flightNumber,
        email,
        name,
        phone,
        address,
      });

      // Update the message based on the response
      setMessage('Booking successful!');
    } catch (error) {
      console.error('Error booking flight:', error);
      setMessage('Failed to book the flight. Please try again.');
    }
  };

  const handleViewBooking = () => {
    navigate('/view-booking'); // Navigate to the booking details page
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">Flight Booking</div>
        <button className="view-booking-btn" onClick={handleViewBooking}>
          View Your Booking
        </button>
      </nav>

      <div className="booking-container">
        <h2>Book Your Flight</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Flight Number</label>
            <input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Book Now</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </>
  );
}

export default BookingPage;
