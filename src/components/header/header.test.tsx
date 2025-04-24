import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import * as useAuthMock from '../../hooks/use-auth';
import { User } from '../../types/user';
import { Header } from './header';

describe('Header', () => {
  vi.spyOn(useAuthMock, 'default').mockReturnValue({
    isSignedIn: true,
    isLoading: false,
    currentUserData: {
      firstName: 'Test',
      lastName: 'User',
      displayName: 'Test User',
      emailAddress: 'test@example.com',
      phoneNumber: '123-456-7890',
    },
    error: null,
    signIn: vi.fn(),
    signInWithSso: vi.fn(),
    signOut: vi.fn(),
  });

  const headerComponent = (
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );

  test('should render successfully', async () => {
    const { baseElement } = render(headerComponent);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });

  test('should navigate away from home', async () => {
    render(headerComponent);

    await userEvent.click(screen.getByText('Dashboard', { selector: 'a' }));
    expect(window.location.pathname).toBe('/dashboard');
  });

  test('should handle sign in', async () => {
    vi.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: false,
      isLoading: false,
      currentUserData: {} as User,
      error: null,
      signIn: vi.fn(),
      signInWithSso: vi.fn(),
      signOut: vi.fn(),
    });

    const { baseElement } = render(headerComponent);
    await act(async () => {
      expect(baseElement).toBeTruthy();
      fireEvent.click(screen.getByText('Sign In'));
    });
  });

  test('should handle sign out', async () => {
    render(headerComponent);

    const signOutButton = screen.getByText((content, element) => {
      return element?.tagName === 'BUTTON' && content === 'Sign Out';
    });

    expect(signOutButton).toBeTruthy();
    await act(async () => {
      fireEvent.click(signOutButton);
    });
  });

  test('should display menu when button is clicked', async () => {
    render(headerComponent);

    const menuButton = screen.getByText('Menu');
    expect(menuButton).toBeTruthy();

    await act(async () => {
      fireEvent.click(menuButton);
    });

    const menu = screen.getByRole('navigation');
    expect(menu).toBeTruthy();
  });

  test('should render menu successfully', () => {
    render(headerComponent);

    expect(screen.getByText('Skip to main content')).toBeTruthy();
    expect(screen.getByText('Menu')).toBeTruthy();
  });

  test('should toggle the menu on button click', () => {
    render(headerComponent);

    const menuButton = screen.getByText('Menu');
    fireEvent.click(menuButton);

    const menu = screen.getByRole('navigation');
    expect(menu).toBeTruthy();
  });

  test('should perform a search', async () => {
    render(headerComponent);

    const searchInput = screen.getByLabelText('Search', { selector: 'input' });
    await userEvent.type(searchInput, 'test');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    expect(window.location.pathname).toBe('/results');
  });

  test('should have a grey background color matching side-navigation', () => {
    render(headerComponent);

    const header = document.querySelector('.usa-header');
    expect(header).toHaveStyle('background-color: #f8f9fa');
  });

  test('footer should not be visible on the sign-in page', async () => {
    render(headerComponent);

    // Simulate navigation to the sign-in page
    await act(async () => {
      window.history.pushState({}, 'Sign In', '/sign-in');
    });

    // Assert that the footer is not visible
    const footer = screen.queryByRole('contentinfo');
    expect(footer).toBeNull();
  });
});
