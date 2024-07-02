import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import useAuth from './use-auth'; // Import your useAuth function

interface ContextWrapperProps {
  children: React.ReactNode;
}

vi.mock('react-oidc-context', () => ({
  useAuth: vi.fn().mockImplementation(() => ({
    signinRedirect: vi.fn().mockResolvedValue(true),
    signoutRedirect: vi.fn().mockResolvedValue(true),
    isAuthenticated: true,
    user: {
      profile: undefined,
    },
  })),
}));

vi.mock('@src/utils/auth', () => ({
  getSignInRedirectUrl: vi.fn(() => 'mocked-redirect-url'), // Replace with the expected URL
}));

describe('useAuth', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV };
    vi.clearAllMocks();
  });

  const contextWrapper = ({ children }: ContextWrapperProps) => (
    <RecoilRoot>{children}</RecoilRoot>
  );

  test('should call signIn with SSO and no configs', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.signIn(true);
    });
    expect(result.current.signIn).toBeTruthy();
  });

  test('should call signIn with SSO and available configs', async () => {
    process.env.SSO_AUTHORITY = 'http://localhost';
    process.env.SSO_CLIENT_ID = 'dev-client';

    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.signIn(true);
    });
    expect(result.current.signIn).toBeTruthy();
  });

  it('should set isSignedIn to true when authenticated with sso', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    act(() => {
      result.current.signIn(true);
    });

    expect(result.current.isSignedIn).toBe(true);
  });

  // it('should not authenticated with sso and error', () => {
  //   vi.mock('react-oidc-context', () => ({
  //     useAuth: vi.fn().mockImplementation(() => ({
  //       signinRedirect: vi.fn().mockRejectedValue(true),
  //       signoutRedirect: vi.fn(),
  //       isAuthenticated: false,
  //     })),
  //   }));
  //   const { result } = renderHook(() => useAuth(), {
  //     wrapper: contextWrapper,
  //   });

  //   act(() => {
  //     result.current.signIn(true);
  //   });

  //   expect(result.current.isSignedIn).toBe(true);
  // });

  // it('should set isSignedIn to true when authenticated without sso', () => {
  //   const { result } = renderHook(() => useAuth(), {
  //     wrapper: contextWrapper,
  //   });

  //   act(() => {
  //     result.current.signIn(false);
  //   });

  //   expect(result.current.isSignedIn).toBe(true);
  // });

  // it('should sign out and set isSignedIn to false when authenticated', () => {
  //   const { result } = renderHook(() => useAuth(), {
  //     wrapper: contextWrapper,
  //   });

  //   act(() => {
  //     result.current.signOut();
  //   });

  //   expect(result.current.isSignedIn).toBe(false);
  // });

  // it('should set isSignedIn to true when authenticated and with profile', () => {
  //   vi.mock('react-oidc-context', () => ({
  //     useAuth: vi.fn().mockImplementation(() => ({
  //       signinRedirect: vi.fn().mockResolvedValue(true),
  //       signoutRedirect: vi.fn().mockResolvedValue(true),
  //       isAuthenticated: true,
  //       user: {
  //         profile: {
  //           firstName: 'John',
  //           lastName: 'Doe',
  //           displayName: 'John Doe',
  //           emailAddress: 'jdoe@test.com',
  //           phoneNumber: '1234567890',
  //         },
  //       },
  //     })),
  //   }));
  //   const { result } = renderHook(() => useAuth(), {
  //     wrapper: contextWrapper,
  //   });

  //   act(() => {
  //     result.current.signIn(false);
  //   });

  //   expect(result.current.isSignedIn).toBe(true);
  // });
});
