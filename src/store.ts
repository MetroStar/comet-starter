import { User } from '@src/types/user';
import { atom } from 'jotai';

const signedInState = atom<boolean>(true);
const currentUserState = atom<User | undefined>(undefined);

export { currentUserState, signedInState };
