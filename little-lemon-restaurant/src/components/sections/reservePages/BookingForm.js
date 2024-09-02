import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function ReservationForm(props) {
  const [finalTime, setFinalTime] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fName: '',
      lName: '',
      email: '',
      tel: '',
      people: 1,
      date: '',
      time: '',
      occasion: 'None',
      preferences: 'None',
      comments: '',
    },
    validationSchema: Yup.object({
      fName: Yup.string()
        .required('First name is required')
        .min(2, 'Minimum 2 characters')
        .max(50, 'Maximum 50 characters'),
      lName: Yup.string()
        .required('Last name is required')
        .min(2, 'Minimum 2 characters')
        .max(50, 'Maximum 50 characters'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      tel: Yup.string()
        .matches(/^\(\d{3}\)-\d{3}-\d{4}$/, 'Phone number must be in (xxx)-xxx-xxxx format')
        .required('Phone number is required'),
      people: Yup.number()
        .min(1, 'Number of people must be at least 1')
        .required('Number of people is required'),
      date: Yup.date().required('Date is required').nullable(),
      time: Yup.string().required('Time is required'),
    }),
    onSubmit: (values) => {
      console.log('Form data', values);
      // Handle form submission logic
      navigate('/confirmation', { state: { reservationDetails: values } });
    },
  });

  useEffect(() => {
    if (props.availableTimes.length > 0) {
      setFinalTime(props.availableTimes.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      )));
    }
  }, [props.availableTimes]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    formik.setFieldValue('date', selectedDate);

    const dateObj = new Date(selectedDate);
    props.updateTimes(dateObj); // Update available times based on the selected date

    formik.setFieldValue('time', ''); // Reset time when date changes
  };

  return (
    <form className="reservation-form" onSubmit={formik.handleSubmit} aria-labelledby="reservation-form-title">
      <h1 id="reservation-form-title">Reservation Form</h1>

      <div>
        <label htmlFor="fName">First Name<sup> *</sup></label> <br />
        <input
          type="text"
          id="fName"
          placeholder="First Name"
          aria-label="First Name"
          {...formik.getFieldProps('fName')}
        />
        {formik.touched.fName && formik.errors.fName ? (
          <div className="error" role="alert">{formik.errors.fName}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="lName">Last Name<sup> *</sup></label> <br />
        <input
          type="text"
          id="lName"
          placeholder="Last Name"
          aria-label="Last Name"
          {...formik.getFieldProps('lName')}
        />
        {formik.touched.lName && formik.errors.lName ? (
          <div className="error" role="alert">{formik.errors.lName}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="email">Email<sup> *</sup></label> <br />
        <input
          type="email"
          id="email"
          placeholder="Email"
          aria-label="Email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error" role="alert">{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="phonenum">Phone Number<sup> *</sup></label> <br />
        <input
          type="tel"
          id="phonenum"
          placeholder="(xxx)-xxx-xxxx"
          aria-label="Phone Number"
          {...formik.getFieldProps('tel')}
        />
        {formik.touched.tel && formik.errors.tel ? (
          <div className="error" role="alert">{formik.errors.tel}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="people">Number of People<sup> *</sup></label> <br />
        <input
          type="number"
          id="people"
          placeholder="Number of People"
          aria-label="Number of People"
          {...formik.getFieldProps('people')}
        />
        {formik.touched.people && formik.errors.people ? (
          <div className="error" role="alert">{formik.errors.people}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="date">Select Date<sup> *</sup></label> <br />
        <input
          type="date"
          id="date"
          aria-label="Select Date"
          {...formik.getFieldProps('date')}
          onChange={handleDateChange}
        />
        {formik.touched.date && formik.errors.date ? (
          <div className="error" role="alert">{formik.errors.date}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="time">Select Time<sup> *</sup></label> <br />
        <select
          id="time"
          aria-label="Select Time"
          {...formik.getFieldProps('time')}
        >
          <option value="" label="Select Time" />
          {finalTime}
        </select>
        {formik.touched.time && formik.errors.time ? (
          <div className="error" role="alert">{formik.errors.time}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="occasion">Occasion</label> <br />
        <select
          id="occasion"
          aria-label="Occasion"
          {...formik.getFieldProps('occasion')}
        >
          <option value="None">None</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Engagement">Engagement</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="preferences">Seating Preferences</label> <br />
        <select
          id="preferences"
          aria-label="Seating Preferences"
          {...formik.getFieldProps('preferences')}
        >
          <option value="None">None</option>
          <option value="Indoors">Indoors</option>
          <option value="Outdoor (Patio)">Outdoor (Patio)</option>
          <option value="Outdoor (Sidewalk)">Outdoor (Sidewalk)</option>
        </select>
      </div>

      <div>
        <label htmlFor="comments">Additional Comments</label> <br />
        <textarea
          id="comments"
          rows={8}
          cols={50}
          placeholder="Additional Comments"
          aria-label="Additional Comments"
          {...formik.getFieldProps('comments')}
        />
      </div>

      <div>
        <br />
        <small>
          <p>
            Note: You cannot edit your reservation after submission. Please
            double-check your answer before submitting your reservation request.
          </p>
        </small>
        <button type="submit" className="action-button" aria-label="Submit Reservation" disabled={!formik.isValid || formik.isSubmitting}>
          Book Table
        </button>
      </div>
    </form>
  );
}
