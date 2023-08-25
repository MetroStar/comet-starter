import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'react-oidc-context';
import { RecoilRoot } from 'recoil';
import * as useAuthMock from '../../hooks/use-auth';
import { User } from '../../types/user';
import { Header } from './header';

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
    jest.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    render(headerComponent);

    await userEvent.click(screen.getByText('Dashboard', { selector: 'a' }));
    expect(window.location.pathname).toBe('/dashboard');
  });

  test('should Sign In', async () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href),
    });

    jest.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: false,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    render(headerComponent);
    await userEvent.click(screen.getByText('Sign In', { selector: 'a' }));
    expect(window.location.href).toBeTruthy();
  });

  test('should Sign Out', async () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href),
    });

    jest.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    render(headerComponent);

    await userEvent.click(screen.getByText('Sign Out', { selector: 'a' }));
    expect(window.location.href).toBeTruthy();
  });

  test('should display menu when button is clicked', async () => {
    const { baseElement } = render(headerComponent);
    global.scrollTo = jest.fn();
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
});
