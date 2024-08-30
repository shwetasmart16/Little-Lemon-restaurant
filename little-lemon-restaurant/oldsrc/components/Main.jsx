import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import ConfirmedBooking from './components/ConfirmedBooking';
import BookingsList from './components/BookingsList'; // Import the new component

const Main = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/confirmed" element={<ConfirmedBooking />} />
      <Route path="/bookings-list" element={<BookingsList />} /> {/* New route */}
    </Routes>
  </Router>
);

export default Main;
