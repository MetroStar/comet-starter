import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { User } from '@src/types';
import axios from '@src/utils/axios';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import * as useAuthMock from '../../hooks/use-auth';
import { SignIn } from './sign-in';

describe('SignIn', () => {
  const signInComponent = (
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );

  const mockUsername = 'username1';
  const mockPassword = 'test1234';

  beforeEach(() => {
    mock.reset();
  });

  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
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
    mock.onPost(new RegExp('/auth/signin')).reply(200, {
      success: true,
      status: 200,
      data: { display_name: 'admin' },
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
    mock.onPost(new RegExp('/auth/signin')).reply(200, {
      success: true,
      status: 200,
      data: { display_name: 'admin' },
    });

    const { baseElement } = render(signInComponent);
    await userEvent.type(screen.getByLabelText('Username'), mockUsername);
    await userEvent.type(screen.getByLabelText('Password'), mockPassword);

    await userEvent.click(
      screen.getByText('Sign In', { selector: 'button[type=submit]' }),
    );
    expect(baseElement.querySelectorAll('.usa-error-message').length).toBe(0);
  });

  test('should cancel a login attempt', async () => {
    const { baseElement } = render(signInComponent);
    await userEvent.click(
      screen.getByText('Cancel', { selector: 'button[type=button]' }),
    );
    expect(baseElement.querySelectorAll('.usa-error-message').length).toBe(0);
  });

  test('should simulate an sso login', async () => {
    vi.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: false,
      isLoading: false,
      currentUserData: {} as User,
      error: null,
      signIn: vi.fn(),
      signInWithSso: vi.fn(),
      signOut: vi.fn(),
    });
    vi.stubEnv('VITE_SSO_AUTHORITY', 'http://localhost');
    vi.stubEnv('VITE_SSO_CLIENT_ID', 'dev-client');

    const { baseElement } = render(signInComponent);
    await userEvent.click(
      screen.getByText('Sign In with SSO', {
        selector: 'button[type=button]',
      }),
    );
    expect(baseElement.querySelectorAll('.usa-error-message').length).toBe(0);
  });
});
