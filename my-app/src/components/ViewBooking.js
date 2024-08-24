import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewBooking.css';

function ViewBooking() {
  const [searchQueries, setSearchQueries] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchQueries = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/search/all');
        setSearchQueries(response.data);
      } catch (error) {
        console.error('Error fetching search queries:', error);
        setError('An error occurred while fetching data.');
      }
    };

    fetchSearchQueries();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update-ticket/${id}`);
  };

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/search/${id}`);
      setSearchQueries(searchQueries.filter(query => query.id !== id));
    } catch (error) {
      console.error('Error deleting search query:', error);
      setError('An error occurred while deleting the search query.');
    }
  };

  return (
    <div className="view-booking-container">
      <h2>Manage Bookings</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="search-query-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchQueries.length > 0 ? (
            searchQueries.map(query => (
              <tr key={query.id}>
                <td>{query.id}</td>
                <td>{query.source}</td>
                <td>{query.destination}</td>
                <td>{query.date}</td>
                <td>
                  <button 
                    className="update-button" 
                    onClick={() => handleUpdate(query.id)}
                  >
                    Update
                  </button>
                  <button 
                    className="cancel-button" 
                    onClick={() => handleCancel(query.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewBooking;
