import React, { useEffect, useState } from 'react';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Retrieve bookings from local storage
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(savedBookings);
  }, []);

  return (
    <div>
      <h1>Existing Bookings</h1>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              Date: {booking.date}, Time: {booking.time}, Guests: {booking.guests}, Occasion: {booking.occasion}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingsList;
