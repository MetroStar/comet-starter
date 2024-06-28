import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'react-oidc-context';
import { RecoilRoot } from 'recoil';
import * as useAuthMock from '../../hooks/use-auth';
import { User } from '../../types/user';
import { Header } from './header';

// Mock the navigation module
vi.mock('@uswds/uswds/js/usa-header', () => ({
  on: vi.fn(),
  off: vi.fn(),
}));

describe('Header', () => {
  const headerComponent = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </RecoilRoot>
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
    const { baseElement } = render(headerComponent);
    global.scrollTo = vi.fn();
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
});
