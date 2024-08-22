import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BookingPage.css';

function BookingPage() {
  const { flightId } = useParams(); // Get the flightId from the URL
  const [flightNumber, setFlightNumber] = useState(flightId); // Automatically set Flight Number
  const [email, setEmail] = useState(''); // Email will be set based on the logged-in user
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  // Simulating fetching the current user's email (replace with actual logic)
  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem('userEmail'); // Example: Fetch from local storage
    if (loggedInUserEmail) {
      setEmail(loggedInUserEmail);
    }
  }, []);

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

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">Flight Booking</div>
        <button className="view-booking-btn">View Your Booking</button>
      </nav>

      <div className="booking-container">
        <h2>Book Your Flight</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Flight Number</label>
            <input
              type="text"
              value={flightNumber}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              readOnly
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
