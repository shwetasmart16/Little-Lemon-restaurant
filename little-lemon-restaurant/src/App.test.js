import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mocking components to simplify the test
jest.mock('./components/Navbar', () => () => <div>Navbar Component</div>);
jest.mock('./components/Footer', () => () => <div>Footer Component</div>);
jest.mock('./components/Routing', () => () => <div>Routing Component</div>);

test('renders Navbar, Routing, and Footer components', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Check if Navbar is rendered
  const navbarElement = screen.getByText(/Navbar Component/i);
  expect(navbarElement).toBeInTheDocument();

  // Check if Routing is rendered
  const routingElement = screen.getByText(/Routing Component/i);
  expect(routingElement).toBeInTheDocument();

  // Check if Footer is rendered
  const footerElement = screen.getByText(/Footer Component/i);
  expect(footerElement).toBeInTheDocument();
});
