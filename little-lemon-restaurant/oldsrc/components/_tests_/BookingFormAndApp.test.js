import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "../BookingForm";

describe('BookingForm Component', () => {
  test("renders booking form with all fields", () => {
    render(<BookingForm />);
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit reservation/i })).toBeInTheDocument();
  });

  test("initial form state is empty", () => {
    render(<BookingForm />);
    expect(screen.getByLabelText(/choose date/i)).toHaveValue('');
    expect(screen.getByLabelText(/choose time/i)).toHaveValue('');
    expect(screen.getByLabelText(/number of guests/i)).toHaveValue('');
    expect(screen.getByLabelText(/occasion/i)).toHaveValue('');
  });

  test("updates available times when date is selected", () => {
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '2024-09-01' } });

    // Use screen.getAllByRole to get all option elements
    const timeOptions = screen.getAllByRole('option');
    const timeValues = timeOptions.map(option => option.value);

    // Check for the expected options
    expect(timeValues).toContain('18:00');
    expect(timeValues).toContain('19:00');
    expect(timeValues).toContain('20:00');
    expect(timeValues).not.toContain('17:00');
    expect(timeValues).not.toContain('21:00');
  });

  test("submits form with correct data", () => {
    const mockSubmit = jest.fn();
    render(<BookingForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '2024-09-01' } });
    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'Birthday' } });
    fireEvent.click(screen.getByRole("button", { name: /submit reservation/i }));
    expect(mockSubmit).toHaveBeenCalledWith({
      date: '2024-09-01',
      time: '18:00',
      guests: '4',
      occasion: 'Birthday',
    });
  });
});
