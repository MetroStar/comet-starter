import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { Header } from './header';
import { RecoilRoot } from 'recoil';
import * as useAuthMock from '../../hooks/useAuth';
import { User } from '../../auth/types';

describe('Header', () => {
  const headerComponent = (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </RecoilRoot>
  );

  test('should render successfully', () => {
    const { baseElement } = render(headerComponent);
    expect(baseElement).toBeTruthy();
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
    await act(async () => {
      expect(screen.getByText('Menu')).toBeTruthy();
      userEvent.click(button);
    });
    expect(baseElement.querySelector('.usa-nav')).toBeDefined();
  });
});
