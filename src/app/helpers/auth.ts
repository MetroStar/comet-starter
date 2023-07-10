import { User } from '../types/user';

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
