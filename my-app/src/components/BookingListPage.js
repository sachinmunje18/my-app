// src/components/BookingListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookingListPage.css';

function BookingListPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bookings');
        setBookings(response.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to fetch bookings. Please try again.');
      }
    };

    fetchBookings();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update-booking/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/bookings/cancel/${id}`);
      setBookings(bookings.filter((booking) => booking.id !== id));
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError('Failed to cancel booking. Please try again.');
    }
  };

  return (
    <div className="booking-list-container">
      <nav className="navbar">
        <div className="navbar-brand">Booking List</div>
        <button className="back-btn" onClick={() => navigate('/')}>Back to Dashboard</button>
      </nav>

      {error && <p className="error-message">{error}</p>}

      <div className="booking-list-content">
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Flight ID</th>
              <th>Flight Number</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.flightId}</td>
                  <td>{booking.flightNumber}</td>
                  <td>{booking.email}</td>
                  <td>{booking.name}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.address}</td>
                  <td>
                    <button onClick={() => handleUpdate(booking.id)} className="update-btn">Update</button>
                    <button onClick={() => handleDelete(booking.id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingListPage;
