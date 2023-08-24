import { User } from '@src/types/user';
import { render } from '@testing-library/react';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as useAuthMock from '../../hooks/use-auth';
import { ProtectedRoute } from './protected-route';

describe('ProtectedRoute', () => {
  const wrapperComponent = (
    <AuthProvider>
      <RecoilRoot>
        <BrowserRouter>
          <ProtectedRoute />
        </BrowserRouter>
      </RecoilRoot>
    </AuthProvider>
  );

  test('should render successfully', () => {
    const { baseElement } = render(wrapperComponent);
    expect(baseElement).toBeTruthy();
  });

  test('should render successfully when signed in', () => {
    jest.spyOn(useAuthMock, 'default').mockReturnValue({
      isSignedIn: true,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    const { baseElement } = render(wrapperComponent);
    expect(baseElement).toBeTruthy();
  });
});
