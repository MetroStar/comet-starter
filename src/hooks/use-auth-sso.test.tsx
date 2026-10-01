import { act, renderHook } from '@testing-library/react';
import { Provider } from 'jotai';
import useAuth from './use-auth'; // Import your useAuth function

interface ContextWrapperProps {
  children: React.ReactNode;
}

interface MockProfile {
  email?: string;
  given_name?: string;
  family_name?: string;
  name?: string;
  phone_number?: string;
}

// Hoisted mutable state for mock configuration
const mockAuthState: { profile: MockProfile | undefined } = {
  profile: undefined,
};

vi.mock('react-oidc-context', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    isLoading: false,
    user: {
      profile: mockAuthState.profile,
    },
    signinRedirect: vi.fn(),
    signoutRedirect: vi.fn(),
  }),
}));

describe('useAuth', () => {
  afterEach(() => {
    vi.clearAllMocks();
    mockAuthState.profile = undefined; // Reset after each test
  });

  const contextWrapper = ({ children }: ContextWrapperProps) => (
    <Provider>{children}</Provider>
  );

  it('should set isSignedIn to true when authenticated with sso', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.signInWithSso();
    });

    expect(result.current.isSignedIn).toBe(true);
  });

  it('should set isSignedIn to true when authenticated without sso', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    act(() => {
      result.current.signInWithSso();
    });

    expect(result.current.isSignedIn).toBe(true);
  });

  it('should sign out and set isSignedIn to false when authenticated', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    act(() => {
      result.current.signOut();
    });

    expect(result.current.isSignedIn).toBe(false);
  });

  it('should set isSignedIn to true when authenticated and with profile', async () => {
    // Configure mock with profile data for this test
    mockAuthState.profile = {
      email: 'test@example.com',
      given_name: 'Test',
      family_name: 'User',
      name: 'Test User',
      phone_number: '+1-555-0123',
    };

    const { result } = renderHook(() => useAuth(), {
      wrapper: contextWrapper,
    });

    await act(async () => {
      result.current.signInWithSso();
    });

    expect(result.current.isSignedIn).toBe(true);
    // Assert the profile-to-currentUserData mapping
    expect(result.current.currentUserData).toEqual({
      firstName: 'Test',
      lastName: 'User',
      displayName: 'Test User',
      emailAddress: 'test@example.com',
      phoneNumber: '+1-555-0123',
    });
  });
});
