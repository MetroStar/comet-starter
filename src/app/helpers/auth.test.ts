import { userData } from '../data/user';
import { User } from '../types/user';
import { getDisplayName } from './auth';

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
});
