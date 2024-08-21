// src/components/Dashboard.js
import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // Mock search result
    const mockFlights = [
      { id: 1, flightNumber: 'AB123', source, destination, date, price: 200 },
      { id: 2, flightNumber: 'CD456', source, destination, date, price: 250 },
    ];
    setFlights(mockFlights);
  };

  const handleBook = (flightId) => {
    alert(`Flight ${flightId} booked successfully!`);
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">Flight Booking</div>
        <ul className="navbar-menu">
          <li className="navbar-item"><a href="#">Home</a></li>
          <li className="navbar-item"><a href="#">Book a flight</a></li>

          <li className="navbar-item"><a href="#">Profile</a></li>
          <li className="navbar-item"><a href="#">Logout</a></li>
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
          {flights.length > 0 ? (
            <div>
              <h2>Available Flights</h2>
              <ul>
                {flights.map((flight) => (
                  <li key={flight.id} className="flight-item">
                    <p>Flight Number: {flight.flightNumber}</p>
                    <p>Price: ${flight.price}</p>
                    <button onClick={() => handleBook(flight.id)}>Book</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No flights available. Please adjust your search criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
