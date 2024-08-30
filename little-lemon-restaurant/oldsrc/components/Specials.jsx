// src/components/Specials.jsx
import React from 'react';

const specialsData = [
  { id: 1, name: 'Special 1', description: 'Delicious and special!', price: '$12.99' },
  { id: 2, name: 'Special 2', description: 'A must-try dish!', price: '$14.99' },
];

const Specials = () => (
  <section className="specials">
    <h2>Specials</h2>
    <ul>
      {specialsData.map(special => (
        <li key={special.id}>
          <h3>{special.name}</h3>
          <p>{special.description}</p>
          <span>{special.price}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default Specials;
