import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Footer } from './footer';

describe('Footer', () => {
  test('should render successfully', () => {
    const { baseElement } = render(<Footer />);
    const primarySection = baseElement.querySelector(
      '.usa-footer__primary-section',
    );
    const secondarySection = baseElement.querySelector(
      '.usa-footer__secondary-section',
    );

    expect(baseElement).toBeTruthy();
    expect(primarySection).toBeTruthy();
    expect(secondarySection).toBeTruthy();
  });

  test('should scroll to top', async () => {
    window.scrollTo = jest.fn();
    render(<Footer />);

    window.scrollTo(100, 100);
    await userEvent.click(screen.getByText('Return to top', { selector: 'a' }));

    expect(window.scrollX).toBe(0);
    expect(window.scrollY).toBe(0);
  });
});
