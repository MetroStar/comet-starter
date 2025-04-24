import { render, screen } from '@testing-library/react';
import { Products } from './products';

describe('Products', () => {
  it('renders the Products page', () => {
    render(<Products />);
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(
      screen.getByText('Welcome to the Products page!'),
    ).toBeInTheDocument();
  });
});
