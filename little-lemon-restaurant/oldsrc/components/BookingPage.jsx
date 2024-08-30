import React from 'react';
import BookingForm from './BookingForm';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const navigate = useNavigate();

  const submitForm = (formData) => {
    // Retrieve existing bookings from local storage
    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    
    // Add the new booking to the existing bookings
    existingBookings.push(formData);
    
    // Save the updated bookings list to local storage
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    
    console.log("Submitted formData:", formData);
    navigate('/confirmed'); // Navigate to confirmation page
  };

  return (
    <div>
      <h1>Booking Page</h1>
      <BookingForm onSubmit={submitForm} />
    </div>
  );
};

export default BookingPage;
