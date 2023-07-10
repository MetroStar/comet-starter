import { useRecoilState } from 'recoil';
import { signedIn, currentUser } from '../store';
import { User } from '../types/user';
import { userData } from '../data/user';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAuth = () => {
  const [isSignedIn, setIsSignedIn] = useRecoilState<boolean>(signedIn);
  const [error] = useState<string | null>();
  const [currentUserData, setCurrentUserDate] = useRecoilState<User>(currentUser);

  const signIn = (): void => {
    setIsSignedIn(true);
    setCurrentUserDate(userData);
  };

  const signOut = (): void => {
    setIsSignedIn(false);
    setCurrentUserDate({} as User);
  };

  return { isSignedIn, setIsSignedIn, currentUserData, error, signIn, signOut };
};

export default useAuth;
