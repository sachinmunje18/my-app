import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateBookingPage.css';

function UpdateBookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState({
        flightId: '',
        flightNumber: '',
        email: '',
        name: '',
        phone: '',
        address: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/bookings/${id}`);
                setBooking(response.data);
            } catch (err) {
                console.error('Error fetching booking:', err);
                setError('Failed to fetch booking. Please try again.');
            }
        };

        fetchBooking();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/bookings/update/${id}`, booking);
            navigate('/bookings');
        } catch (err) {
            console.error('Error updating booking:', err);
            setError('Failed to update booking. Please try again.');
        }
    };

    return (
        <div className="update-booking-container">
            <h2>Update Booking</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Flight ID:
                    <input type="text" name="flightId" value={booking.flightId} onChange={handleChange} />
                </label>
                <label>
                    Flight Number:
                    <input type="text" name="flightNumber" value={booking.flightNumber} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" value={booking.email} onChange={handleChange} />
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={booking.name} onChange={handleChange} />
                </label>
                <label>
                    Phone:
                    <input type="text" name="phone" value={booking.phone} onChange={handleChange} />
                </label>
                <label>
                    Address:
                    <input type="text" name="address" value={booking.address} onChange={handleChange} />
                </label>
                <button type="submit">Update Booking</button>
            </form>
        </div>
    );
}

export default UpdateBookingPage;
