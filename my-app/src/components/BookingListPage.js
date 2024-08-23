// src/components/BookingListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingListPage.css';

function BookingListPage() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [name, setName] = useState('');
  const [mobileno, setMobileno] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch bookings on component mount
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    
    fetchBookings();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/updateBooking', {
        bookingId: selectedBooking,
        name,
        mobileno,
        address
      });
      setMessage('Booking updated successfully!');
      // Refresh bookings
      const response = await axios.get('http://localhost:8080/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error updating booking:', error);
      setMessage('Failed to update the booking.');
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await axios.post(`http://localhost:8080/api/cancel/${bookingId}`);
      setMessage('Booking canceled successfully!');
      // Refresh bookings
      const response = await axios.get('http://localhost:8080/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error canceling booking:', error);
      setMessage('Failed to cancel the booking.');
    }
  };

  return (
    <div className="booking-list-container">
      <nav className="navbar">
        <div className="navbar-brand">Flight Booking</div>
        <button className="back-btn" onClick={() => window.history.back()}>Back</button>
      </nav>

      <div className="booking-list-content">
        <h2>Manage Your Bookings</h2>
        <div className="booking-table">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Flight ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Mobile No</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.bookingId}>
                  <td>{booking.bookingId}</td>
                  <td>{booking.flightId}</td>
                  <td>{booking.emailId}</td>
                  <td>{booking.name}</td>
                  <td>{booking.mobileno}</td>
                  <td>{booking.address}</td>
                  <td>
                    <button onClick={() => {
                      setSelectedBooking(booking.bookingId);
                      setName(booking.name);
                      setMobileno(booking.mobileno);
                      setAddress(booking.address);
                    }}>
                      Update
                    </button>
                    <button onClick={() => handleCancel(booking.bookingId)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedBooking && (
          <form onSubmit={handleUpdate} className="update-form">
            <h3>Update Booking</h3>
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
              <label>Mobile No</label>
              <input
                type="text"
                value={mobileno}
                onChange={(e) => setMobileno(e.target.value)}
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
            <button type="submit">Update Booking</button>
            {message && <p className="message">{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default BookingListPage;
