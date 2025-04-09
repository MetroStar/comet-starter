import axios from '@src/utils/axios';
import keycloak from '@src/utils/keycloak';
import { act, renderHook } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import useAuth from './use-auth';

interface ContextWrapperProps {
  children: React.ReactNode;
}

describe('useAuth', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
    mock.reset();
  });

  const mock = new MockAdapter(axios);
  beforeAll(() => {
    mock.reset();
  });

  const contextWrapper = ({ children }: ContextWrapperProps) => (
    <AuthProvider {...keycloak}>
      <Provider>{children}</Provider>
    </AuthProvider>
  );

  test('should call signIn successfully', async () => {
    mock.onPost(new RegExp('/auth/signin')).reply(200, {
      success: true,
      status: 200,
      data: { display_name: 'admin' },
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.signIn('username', 'password');
    });
    expect(result.current.signIn).toBeTruthy();
  });

  test('should call signOut successfully', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.signOut();
    });
    expect(result.current.signOut).toBeTruthy();
  });
});
