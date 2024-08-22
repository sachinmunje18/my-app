import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BookingPage.css'; // Import the CSS file for styling

function BookingPage() {
  const { flightId } = useParams(); // Get the flightId from the URL
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to the backend to book the flight
      const response = await axios.post('http://localhost:8080/api/bookings', {
        flightId,
        name,
        email,
        phone
      });

      // Update the message based on the response
      setMessage('Booking successful!');
    } catch (error) {
      console.error('Error booking flight:', error);
      setMessage('Failed to book the flight. Please try again.');
    }
  };

  return (
    <div className="booking-container">
      <h2>Book Your Flight</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Book Now</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default BookingPage;
