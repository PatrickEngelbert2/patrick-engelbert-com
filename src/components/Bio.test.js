import { render, screen } from '@testing-library/react';
import Bio from './Bio';

test('renders bio component', () => {
  render(<Bio />);
  
  // Assert that the bio text is rendered
  const bioText = screen.getByText(/I'm a full-stack Software Engineer/i);
  expect(bioText).toBeInTheDocument();
  
  // Assert that the bio image is rendered
  const bioImage = screen.getByAltText(/Foggy Forest/i);
  expect(bioImage).toBeInTheDocument();
});