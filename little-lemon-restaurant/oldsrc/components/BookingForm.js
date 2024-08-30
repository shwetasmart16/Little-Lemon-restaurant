import React, { useState } from 'react';

const BookingForm = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({ guests: '', email: '', date: '', time: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validate = (fieldValues = formValues) => {
    let tempErrors = { ...formErrors };

    if ('guests' in fieldValues)
      tempErrors.guests = fieldValues.guests >= 1 ? '' : 'Minimum 1 guest required.';

    if ('email' in fieldValues)
      tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
        ? ''
        : 'Email is not valid.';

    if ('date' in fieldValues)
      tempErrors.date = /^\d{4}-\d{2}-\d{2}$/.test(fieldValues.date)
        ? ''
        : 'Date format should be YYYY-MM-DD.';

    if ('time' in fieldValues)
      tempErrors.time = fieldValues.time ? '' : 'Time is required.';

    setFormErrors({
      ...tempErrors,
    });

    setIsFormValid(Object.values(tempErrors).every((x) => x === ''));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(formValues);  // Pass the validated form data back to the parent component
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="guests">Number of Guests:</label>
        <input
          type="number"
          name="guests"
          id="guests"
          value={formValues.guests}
          onChange={handleChange}
          min="1"
          max="10"
          required
          placeholder="Number of guests"
          className="form-control"
        />
        {formErrors.guests && <span className="error">{formErrors.guests}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          name="date"
          id="date"
          value={formValues.date}
          onChange={handleChange}
          pattern="\d{4}-\d{2}-\d{2}"
          required
          placeholder="YYYY-MM-DD"
          className="form-control"
        />
        {formErrors.date && <span className="error">{formErrors.date}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          name="time"
          id="time"
          value={formValues.time}
          onChange={handleChange}
          required
          className="form-control"
        />
        {formErrors.time && <span className="error">{formErrors.time}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
          required
          placeholder="Email"
          className="form-control"
        />
        {formErrors.email && <span className="error">{formErrors.email}</span>}
      </div>

      <button type="submit" disabled={!isFormValid} className="btn btn-primary">
        Reserve
      </button>
    </form>
  );
};

export default BookingForm;
