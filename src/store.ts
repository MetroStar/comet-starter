import { User } from '@src/types/user';
import { atom } from 'jotai';

const signedInState = atom({
  key: 'signedIn',
  default: false,
});

const currentUserState = atom<User | undefined>({
  key: 'currentUser',
  default: undefined,
});

export { currentUserState, signedInState };
