// src/components/CustomersSay.jsx
import React from 'react';

const testimonials = [
  { id: 1, name: 'John Doe', rating: 5, comment: 'Excellent food!' },
  { id: 2, name: 'Jane Smith', rating: 4, comment: 'Great service!' },
];

const CustomersSay = () => (
  <section className="customers-say">
    <h2>What Our Customers Say</h2>
    <ul>
      {testimonials.map(testimonial => (
        <li key={testimonial.id}>
          <p>{testimonial.comment}</p>
          <p><strong>{testimonial.name}</strong> - Rating: {testimonial.rating} stars</p>
        </li>
      ))}
    </ul>
  </section>
);

export default CustomersSay;
