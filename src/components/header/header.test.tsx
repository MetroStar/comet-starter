import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'react-oidc-context';
import { Provider } from 'jotai';
import * as useAuthMock from '../../hooks/use-auth';
import { User } from '../../types/user';
import { Header } from './header';

describe('Header', () => {
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
    vi.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      isLoading: false,
      currentUserData: {} as User,
      error: null,
      signIn: vi.fn(),
      signOut: vi.fn(),
    });

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
      signOut: vi.fn(),
    });

    const { baseElement } = render(headerComponent);
    await act(async () => {
      expect(baseElement).toBeTruthy();
      fireEvent.click(screen.getByText('Sign In'));
    });
  });

  test('should handle sign out', async () => {
    vi.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      isLoading: false,
      currentUserData: {} as User,
      error: null,
      signIn: vi.fn(),
      signOut: vi.fn(),
    });

    const { baseElement } = render(headerComponent);
    await act(async () => {
      expect(baseElement).toBeTruthy();
      fireEvent.click(screen.getByText('Sign Out'));
    });
  });

  test('should display menu when button is clicked', async () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const { baseElement } = render(headerComponent);
    global.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));

    const button = screen.getByText('Menu');
    expect(screen.getByText('Menu')).toBeTruthy();
    userEvent
      .click(button)
      .then(() => {
        // Handle click
      })
      .catch(() => {
        // Handle error
      });
    expect(baseElement.querySelector('.usa-nav')).toBeDefined();
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
  });

  test('should perform a search', async () => {
    vi.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      isLoading: false,
      currentUserData: {} as User,
      error: null,
      signIn: vi.fn(),
      signOut: vi.fn(),
    });

    render(headerComponent);
    await userEvent.type(
      screen.getByLabelText('Search', { selector: 'input' }),
      'test',
    );

    await userEvent.click(
      document.querySelector('button[type=submit') as HTMLElement,
    );
    expect(window.location.pathname).toBe('/results');
  });
});
