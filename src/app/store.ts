import { atom } from 'recoil';
import { User } from './types/user';

const signedIn = atom({
  key: 'signedIn',
  default: false,
});

const currentUser = atom<User | undefined>({
  key: 'currentUser',
  default: undefined,
});

export { signedIn, currentUser };
