import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders Navbar, Routing, and Footer components', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Check if Navbar is rendered
  // You may need to refine this depending on your actual implementation
  const navbarDesktop = screen.getByRole('navigation', { name: /desktop/i });
  const navbarBurger = screen.getByRole('navigation', { name: /burger/i });

  expect(navbarDesktop).toBeInTheDocument();
  expect(navbarBurger).toBeInTheDocument();

  // Check if Routing is rendered by looking for text from the Homepage component
  // Adjust the text based on what your Homepage component renders
  const homeText = screen.queryByText(/home/i);
  expect(homeText).toBeInTheDocument(); // This assumes Homepage contains 'Home'

  // Check if Footer is rendered
  // This assumes Footer has a specific role or test ID; adjust accordingly.
  const footer = screen.getByRole('contentinfo');
  expect(footer).toBeInTheDocument();
});
