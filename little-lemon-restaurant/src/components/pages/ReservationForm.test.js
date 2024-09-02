// ReservationForm.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReservationForm from './ReservationForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Mock the navigation function
const mockNavigate = jest.fn();

describe('ReservationForm Component', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering and UI Tests
  test('renders Reservation Form with all fields', () => {
    render(<ReservationForm availableTimes={[]} updateTimes={() => {}} />);

    expect(screen.getByLabelText(/First Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of People/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Date/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Time/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Seating Preferences/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Additional Comments/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Book Table/ })).toBeInTheDocument();
  });

  // Validation Tests
  test('shows validation errors for required fields', async () => {
    render(<ReservationForm availableTimes={[]} updateTimes={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /Book Table/ }));

    await waitFor(() => {
      expect(screen.getByText(/First name is required/)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/)).toBeInTheDocument();
      expect(screen.getByText(/Phone number is required/)).toBeInTheDocument();
      expect(screen.getByText(/Number of people is required/)).toBeInTheDocument();
      expect(screen.getByText(/Date is required/)).toBeInTheDocument();
      expect(screen.getByText(/Time is required/)).toBeInTheDocument();
    });
  });

  // ARIA Attributes Tests
  test('ARIA attributes are correctly applied', () => {
    render(<ReservationForm availableTimes={[]} updateTimes={() => {}} />);

    expect(screen.getByLabelText(/First Name/)).toHaveAttribute('aria-label', 'First Name');
    expect(screen.getByLabelText(/Last Name/)).toHaveAttribute('aria-label', 'Last Name');
    expect(screen.getByLabelText(/Email/)).toHaveAttribute('aria-label', 'Email');
    expect(screen.getByLabelText(/Phone Number/)).toHaveAttribute('aria-label', 'Phone Number');
    expect(screen.getByLabelText(/Select Date/)).toHaveAttribute('aria-label', 'Select Date');
    expect(screen.getByLabelText(/Select Time/)).toHaveAttribute('aria-label', 'Select Time');
    expect(screen.getByRole('button', { name: /Book Table/ })).toHaveAttribute('aria-label', 'Submit Reservation');
  });

  // Form Submission Tests
  test('form submission navigates to confirmation page', () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<ReservationForm availableTimes={[]} updateTimes={() => {}} />} />
          <Route path="/confirmation" element={<div>Confirmation Page</div>} />
        </Routes>
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/First Name/), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/), { target: { value: '(123)-456-7890' } });
    fireEvent.change(screen.getByLabelText(/Number of People/), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/Select Date/), { target: { value: '2024-09-30' } });
    fireEvent.change(screen.getByLabelText(/Select Time/), { target: { value: '18:00' } });

    fireEvent.click(screen.getByRole('button', { name: /Book Table/ }));

    expect(mockNavigate).toHaveBeenCalledWith('/confirmation', expect.objectContaining({
      state: {
        reservationDetails: {
          fName: 'John',
          lName: 'Doe',
          email: 'john.doe@example.com',
          tel: '(123)-456-7890',
          people: 2,
          date: '2024-09-30',
          time: '18:00',
          occasion: 'None',
          preferences: 'None',
          comments: '',
        }
      }
    }));
  });

  // Interactive Behavior Tests
  test('updates available times on date change', () => {
    const updateTimesMock = jest.fn();

    render(<ReservationForm availableTimes={['18:00', '19:00']} updateTimes={updateTimesMock} />);

    fireEvent.change(screen.getByLabelText(/Select Date/), { target: { value: '2024-09-30' } });

    expect(updateTimesMock).toHaveBeenCalledWith(new Date('2024-09-30'));
  });
});
