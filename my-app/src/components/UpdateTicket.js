import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateTicket.css';

function UpdateTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flightAvailable, setFlightAvailable] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchSearchQuery = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/search/${id}`);
        const query = response.data;
        setSource(query.source);
        setDestination(query.destination);
        setDate(query.date);
      } catch (error) {
        console.error('Error fetching search query:', error);
        setError('An error occurred while fetching the search query.');
      }
    };

    fetchSearchQuery();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Check if the flight is available for the given date
      const flightResponse = await axios.get('http://localhost:8080/api/flights/search', {
        params: { date }
      });

      if (flightResponse.data.length > 0) {
        // Update the search query
        await axios.put(`http://localhost:8080/api/search/${id}`, {
          source,
          destination,
          date
        });
        setSuccessMessage('Updated successfully.');
        setError('');
        setFlightAvailable(true);
      } else {
        setFlightAvailable(false);
        setError('No flights available for the selected date.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error updating search query:', error);
      setError('An error occurred while updating the search query.');
      setSuccessMessage('');
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="update-ticket-container">
      <h2>Update Ticket</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="source">Source:</label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {!flightAvailable && <p className="flight-not-available">Flight is not available for the selected date.</p>}
      <button className="go-to-dashboard-button" onClick={handleGoToDashboard}>
        Go to Dashboard
      </button>
    </div>
  );
}

export default UpdateTicket;
