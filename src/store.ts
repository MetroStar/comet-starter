import { User } from '@src/types/user';
import { atom } from 'jotai';

const signedInState = atom<boolean>(false);
const currentUserState = atom<User | undefined>(undefined);

export { currentUserState, signedInState };
