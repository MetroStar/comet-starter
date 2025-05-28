import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect } from 'vitest';
import { ContactUs } from './contact-us';

describe('ContactUs', () => {
  const componentWrapper = (
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <ContactUs />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );

  test('renders the contact form correctly', () => {
    render(componentWrapper);

    expect(
      screen.getByRole('heading', { name: /contact us/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    const user = userEvent.setup();
    render(componentWrapper);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Fill out the form
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john.doe@example.com');
    await user.type(messageInput, 'This is a test message');

    // Submit the form
    await user.click(submitButton);

    // Check that success alert is displayed
    await waitFor(() => {
      expect(
        screen.getByText(/form submitted successfully/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/someone will be in touch soon/i),
      ).toBeInTheDocument();
    });
  });

  test('shows validation errors for all empty required fields', async () => {
    const user = userEvent.setup();
    render(componentWrapper);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Try to submit empty form
    await user.click(submitButton);

    // Check for validation error messages
    await waitFor(() => {
      expect(screen.getAllByText(/this field is required/i)).toHaveLength(3);
    });
  });

  test('shows validation errors for some empty required fields', async () => {
    const user = userEvent.setup();
    render(componentWrapper);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Fill out part of the form and submit
    await user.type(nameInput, 'John Doe');
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getAllByText(/this field is required/i)).toHaveLength(2);
    });

    // Fill out part of the form and submit
    await user.type(emailInput, 'john.doe@example.com');
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getAllByText(/this field is required/i)).toHaveLength(1);
    });

    // Fill out part of the form and submit
    await user.type(messageInput, 'This is a test message');
    await user.click(submitButton);

    expect(
      screen.queryByText(/this field is required/i),
    ).not.toBeInTheDocument();
  });

  test('disables submit button when there are validation errors', async () => {
    const user = userEvent.setup();
    render(componentWrapper);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Initially button should be enabled (no validation errors yet)
    expect(submitButton).not.toBeDisabled();

    // Try to submit to trigger validation
    await user.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  test('enables submit button when all fields are valid', async () => {
    const user = userEvent.setup();
    render(componentWrapper);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Fill out all fields with valid data
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john.doe@example.com');
    await user.type(messageInput, 'Test message');

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  test('does not show success alert initially', () => {
    render(componentWrapper);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(
      screen.queryByText(/form submitted successfully/i),
    ).not.toBeInTheDocument();
  });
});
