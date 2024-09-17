import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from './BookingForm';
import '@testing-library/jest-dom/extend-expect';

// Mock the props for ReservationForm component
const mockUpdateTimes = jest.fn();
const availableTimes = ['12:00 PM', '1:00 PM', '2:00 PM'];

describe('BookingForm', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <BookingForm availableTimes={availableTimes} updateTimes={mockUpdateTimes} />
      </MemoryRouter>
    );
  });

  test('renders BookingForm and form fields', () => {
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of People/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Seating Preferences/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Additional Comments/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Book Table/i })).toBeInTheDocument();
  });

  test('displays validation errors for invalid inputs', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Book Table/i }));
    
    // Check validation errors individually
    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Number of people is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Time is required/i)).toBeInTheDocument();
    });
  });

  test('updates available times when date is selected', async () => {
    // Set up a date value
    fireEvent.change(screen.getByLabelText(/Select Date/i), { target: { value: '2024-09-05' } });

    // Ensure that the updateTimes function is called with the correct argument
    await waitFor(() => {
      expect(mockUpdateTimes).toHaveBeenCalledWith(new Date('2024-09-05'));
    });

    // Check if the time options are updated
    availableTimes.forEach(async (time) => {
      await waitFor(() => {
        expect(screen.getByRole('option', { name: time })).toBeInTheDocument();
      });
    });
  });

  test('submits the form with valid data', async () => {
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '(123)-456-7890' } });
    fireEvent.change(screen.getByLabelText(/Number of People/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/Select Date/i), { target: { value: '2024-09-05' } });
    fireEvent.change(screen.getByLabelText(/Select Time/i), { target: { value: '12:00 PM' } });
    
    // Click the submit button
    fireEvent.click(screen.getByRole('button', { name: /Book Table/i }));
    
    // Expect form submission logic to be called (like navigating or API call)
    // This test assumes you have some way to verify that form submission works, like a mock function or redirect check.
  });
});
