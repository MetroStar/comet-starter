import { useRecoilState } from "recoil";
import { signedIn, currentUser } from "../store";
import { User } from "../auth/types";
import { mockUser } from "../auth/__mocks__/user";
import { useState } from "react";

const useAuth = () => {
  const [isSignedIn, setIsSignedIn] = useRecoilState<boolean>(signedIn);
  const [error, setError] = useState<string | null>();
  const [currentUserData, setCurrentUserDate] =
    useRecoilState<User>(currentUser);

  const signIn = (): void => {
    setIsSignedIn(true);
    setCurrentUserDate(mockUser);
  };

  const signOut = (): void => {
    setIsSignedIn(false);
    setCurrentUserDate({} as User);
  };

  return { isSignedIn, currentUserData, error, signIn, signOut };
};

export default useAuth;
