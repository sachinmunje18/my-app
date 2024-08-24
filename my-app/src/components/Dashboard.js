import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './Dashboard.css';

function Dashboard() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/search/save', {
        source,
        destination,
        date
      });

      const response = await axios.get('http://localhost:8080/api/flights/search', {
        params: { source, destination, date }
      });

      if (response.data.length > 0) {
        setFlights(response.data);
        setMessage('');
      } else {
        setFlights([]);
        setMessage('No flights available on this date.');
      }
    } catch (error) {
      console.error('Error fetching flights or saving search:', error);
      setFlights([]);
      setMessage('An error occurred while fetching flights.');
    }
  };

  const handleBook = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleViewBookings = () => {
    navigate('/view-booking');
  };

  const handleLogout = () => {
    // Clear authentication data (e.g., token) from local storage or state
    localStorage.removeItem('authToken'); // Adjust this as needed for your app

    // Redirect to the root path or homepage
    navigate('/'); // Redirect to the homepage or initial page
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">Flight Booking</div>
        <ul className="navbar-menu">
          <li className="navbar-item"><a href="#" className="navbar-button">Home</a></li>
          <li className="navbar-item"><a href="#" className="navbar-button" onClick={handleViewBookings}>View Bookings</a></li>
          <li className="navbar-item"><a href="#" className="navbar-button" onClick={handleLogout}>Logout</a></li>
        </ul>
      </nav>

      <div className="dashboard-content">
        <div className="search-form">
          <h2>Search Flights</h2>
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label>Source</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <button type="submit">Search</button>
          </form>
        </div>

        <div className="flights-list">
          {message && <p>{message}</p>}
          {flights.length > 0 && !message ? (
            <div>
              <h2>Available Flights</h2>
              <ul>
                {flights.map((flight) => (
                  <li key={flight.id} className="flight-item">
                    <p>Flight Number: {flight.flightNumber}</p>
                    <p>Source: {flight.source}</p>
                    <p>Destination: {flight.destination}</p>
                    <p>Date: {flight.date}</p>
                    <p>Cost: ₹{flight.cost}</p>
                    <button onClick={() => handleBook(flight)}>Book</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Thank You for Booking!</h4>
          <p>Your booking for Flight Number: {selectedFlight?.flightNumber} was successful.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleViewBookings}>View Your Bookings</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;
