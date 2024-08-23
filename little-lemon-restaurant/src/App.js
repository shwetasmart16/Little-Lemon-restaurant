import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Homepage from './components/HomePage';
import BookingPage from './components/BookingPage';

const App = () => (
  <Router>
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
