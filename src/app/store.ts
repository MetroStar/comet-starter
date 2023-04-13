import { atom } from 'recoil';
import { type User } from './auth/types';

const signedIn = atom({
  key: 'signedIn',
  default: false,
});

const currentUser = atom({
  key: 'currentUser',
  default: { displayName: 'Guest' } as User,
});

export { signedIn, currentUser };
