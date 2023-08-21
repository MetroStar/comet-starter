import { User } from '@src/types/user';

export const getDisplayName = (user: User): string => {
  if (user.displayName) {
    return user.displayName;
  } else if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  } else if (user.firstName && !user.lastName) {
    return user.firstName;
  } else {
    return '';
  }
};

export const getSignInRedirectUrl = (): string => {
  return `${window.location.origin}/signin`;
};

export const hasSsoConfig = (): boolean => {
  return process.env.SSO_AUTHORITY && process.env.SSO_CLIENT_ID ? true : false;
};
