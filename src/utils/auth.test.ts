import { userData } from '@src/data/users';
import { User } from '@src/types';
import { getDisplayName, getSignInRedirectUrl, hasSsoConfig } from './auth';

describe('Auth Helpers', () => {
  test('should get display name with display name', () => {
    const displayName = getDisplayName(userData);
    expect(displayName).toEqual(userData.displayName);
  });

  test('should get display name with first and last', () => {
    const newUser: User = {
      ...userData,
      displayName: undefined,
    };

    const displayName = getDisplayName(newUser);
    expect(displayName).toEqual(userData.displayName);
  });

  test('should get display name with just first name', () => {
    const newUser: User = {
      ...userData,
      displayName: undefined,
      lastName: undefined,
    };
    const displayName = getDisplayName(newUser);
    expect(displayName).toEqual(userData.firstName);
  });

  test('should get empty display name', () => {
    const newUser: User = {
      ...userData,
      displayName: undefined,
      lastName: undefined,
      firstName: undefined,
    };

    const displayName = getDisplayName(newUser);
    expect(displayName).toEqual('');
  });

  test('should get a signin URL', () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href),
    });

    const url = getSignInRedirectUrl();
    expect(url).toContain('/dashboard');
  });

  test('should verify no SSL config', () => {
    vi.stubEnv('VITE_SSO_AUTHORITY', undefined);
    vi.stubEnv('VITE_SSO_CLIENT_ID', undefined);

    const hasConfig = hasSsoConfig();
    expect(hasConfig).toBeFalsy();
  });

  test('should verify SSL config', () => {
    vi.stubEnv('VITE_SSO_AUTHORITY', 'http://localhost');
    vi.stubEnv('VITE_SSO_CLIENT_ID', 'dev-client');
    const hasConfig = hasSsoConfig();

    expect(hasConfig).toBeTruthy();
  });
});
