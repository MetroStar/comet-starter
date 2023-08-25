import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'react-oidc-context';
import { RecoilRoot } from 'recoil';
import * as useAuthMock from '../../hooks/use-auth';
import { User } from '../../types/user';
import { SignIn } from './sign-in';

describe('SignIn', () => {
  const signInComponent = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </RecoilRoot>
    </AuthProvider>
  );

  const mockUsername = 'username1';
  const mockPassword = 'test1234';

  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  test('should render successfully', async () => {
    const { baseElement } = render(signInComponent);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });

  test('should simulate a login attempt with blank fields', async () => {
    const { baseElement } = render(signInComponent);
    await userEvent.click(
      screen.getByText('Sign In', { selector: 'button[type=submit]' }),
    );
    expect(baseElement.querySelectorAll('.usa-error-message').length).toBe(2);
  });

  test('should simulate a login attempt with blank username', async () => {
    const { baseElement } = render(signInComponent);
    await userEvent.type(screen.getByLabelText('Password'), mockPassword);
    await userEvent.click(
      screen.getByText('Sign In', { selector: 'button[type=submit]' }),
    );
    expect(baseElement.querySelectorAll('.usa-error-message').length).toBe(1);
  });

  test('should simulate a login attempt with blank password', async () => {
    const { baseElement } = render(signInComponent);
    await userEvent.type(screen.getByLabelText('Username'), mockUsername);
    await userEvent.click(
      screen.getByText('Sign In', { selector: 'button[type=submit]' }),
    );
    expect(baseElement.querySelectorAll('.usa-error-message').length).toBe(1);
  });

  test('should simulate a successful login attempt', async () => {
    jest.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: false,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    const { baseElement } = render(signInComponent);
    await userEvent.type(screen.getByLabelText('Username'), mockUsername);
    await userEvent.type(screen.getByLabelText('Password'), mockPassword);

    await userEvent.click(
      screen.getByText('Sign In', { selector: 'button[type=submit]' }),
    );
    expect(baseElement.querySelectorAll('.usa-error-message').length).toBe(0);
  });

  test('should simulate a successful login attempt when signed in', async () => {
    jest.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    const { baseElement } = render(signInComponent);
    await userEvent.type(screen.getByLabelText('Username'), mockUsername);
    await userEvent.type(screen.getByLabelText('Password'), mockPassword);

    await userEvent.click(
      screen.getByText('Sign In', { selector: 'button[type=submit]' }),
    );
    expect(baseElement.querySelectorAll('.usa-error-message').length).toBe(0);
  });

  test('should simulate an unsuccessful login attempt', async () => {
    jest.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: false,
      currentUserData: {} as User,
      error: 'Error',
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    const { baseElement } = render(signInComponent);
    await userEvent.type(screen.getByLabelText('Username'), mockUsername);
    await userEvent.type(screen.getByLabelText('Password'), mockPassword);

    await userEvent.click(
      screen.getByText('Sign In', { selector: 'button[type=submit]' }),
    );
    expect(baseElement.querySelectorAll('.usa-alert').length).toBe(1);
  });

  test('should cancel a login attempt', async () => {
    const { baseElement } = render(signInComponent);
    await userEvent.click(
      screen.getByText('Cancel', { selector: 'button[type=button]' }),
    );
    expect(baseElement.querySelectorAll('.usa-error-message').length).toBe(0);
  });

  test('should simulate an sso login', async () => {
    jest.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: false,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    process.env.SSO_AUTHORITY = 'http://localhost';
    process.env.SSO_CLIENT_ID = 'dev-client';

    const { baseElement } = render(signInComponent);
    await userEvent.click(
      screen.getByText('Sign In with SSO', {
        selector: 'button[type=button]',
      }),
    );
    expect(baseElement.querySelectorAll('.usa-error-message').length).toBe(0);
  });
});
