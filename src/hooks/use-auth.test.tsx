import keycloak from '@src/utils/keycloak';
import { act, renderHook } from '@testing-library/react';
import { AuthProvider } from 'react-oidc-context';
import { RecoilRoot } from 'recoil';
import useAuth from './use-auth';

interface ContextWrapperProps {
  children: React.ReactNode;
}

describe('useAuth', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  const contextWrapper = ({ children }: ContextWrapperProps) => (
    <AuthProvider {...keycloak}>
      <RecoilRoot>{children}</RecoilRoot>
    </AuthProvider>
  );

  test('should call signIn successfully', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.signIn(false);
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
