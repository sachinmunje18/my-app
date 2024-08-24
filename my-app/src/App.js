import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import BookingPage from './components/BookingPage';
import BookingListPage from './components/BookingListPage';
import UpdateBookingPage from './components/UpdateBookingPage';
import WelcomeBooking from './components/WelcomeBooking';
import ViewBooking from './components/ViewBooking';
import UpdateTicket from './components/UpdateTicket'; // Import the UpdateTicket component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book/:flightId" element={<BookingPage />} />
        <Route path="/bookings" element={<BookingListPage />} />
        <Route path="/update-booking/:id" element={<UpdateBookingPage />} />
        <Route path="/welcome-booking" element={<WelcomeBooking />} />
        <Route path="/view-booking" element={<ViewBooking />} />
        <Route path="/update-ticket/:id" element={<UpdateTicket />} /> {/* Route for the update ticket */}
      </Routes>
    </Router>
  );
}

export default App;
