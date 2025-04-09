import { User } from '@src/types/user';
import { act, render } from '@testing-library/react';
import { Provider } from 'jotai';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import * as useAuthMock from '../../hooks/use-auth';
import { ProtectedRoute } from './protected-route';

describe('ProtectedRoute', () => {
  const wrapperComponent = (
    <AuthProvider>
      <Provider>
        <BrowserRouter>
          <ProtectedRoute />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );

  test('should render successfully', async () => {
    const { baseElement } = render(wrapperComponent);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });

  test('should render successfully when signed in', async () => {
    vi.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      isLoading: false,
      currentUserData: {} as User,
      error: null,
      signIn: vi.fn(),
      signInWithSso: vi.fn(),
      signOut: vi.fn(),
    });

    const { baseElement } = render(wrapperComponent);
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
  });

  test('should render loading when not signed in and loading', async () => {
    vi.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: false,
      isLoading: true,
      currentUserData: {} as User,
      error: null,
      signIn: vi.fn(),
      signInWithSso: vi.fn(),
      signOut: vi.fn(),
    });

    const { baseElement, getByText } = render(wrapperComponent);
    await act(async () => {
      expect(baseElement).toBeTruthy();
      expect(getByText('Loading...')).toBeTruthy();
    });
  });
});
