import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import { ProjectForm } from './project-form';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ProjectForm', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ProjectForm />
      </MemoryRouter>,
    );

  test('renders project form correctly', () => {
    renderComponent();

    expect(
      screen.getByRole('heading', { name: 'New Project' }),
    ).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('of 5')).toBeInTheDocument();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/supporting documentation/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /next step/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /return to top/i }),
    ).toBeInTheDocument();
  });

  test('allows user to fill out form fields', async () => {
    const user = userEvent.setup();
    renderComponent();

    const nameInput = screen.getByLabelText(/name/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    await user.type(nameInput, 'Test Project');
    await user.type(descriptionInput, 'This is a test project description');

    expect(nameInput).toHaveValue('Test Project');
    expect(descriptionInput).toHaveValue('This is a test project description');
  });

  test('submits form and navigates to dashboard', async () => {
    const user = userEvent.setup();
    renderComponent();

    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /next step/i });

    await user.type(nameInput, 'Test Project');
    await user.click(submitButton);

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('return to top button scrolls to top', async () => {
    const user = userEvent.setup();
    const scrollToSpy = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => {});

    renderComponent();

    const returnToTopButton = screen.getByRole('button', {
      name: /return to top/i,
    });
    await user.click(returnToTopButton);

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });

    scrollToSpy.mockRestore();
  });

  test('step indicator shows correct current step', () => {
    renderComponent();

    // Check if step indicator is rendered with correct props
    expect(screen.getByText('Project Details')).toBeInTheDocument();
    expect(screen.getByText('Team Assignment')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
  });
});
