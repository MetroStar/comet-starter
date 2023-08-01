import { useState } from "react";
import { useRecoilState } from "recoil";
import { userData } from "../data/user";
import { currentUser, signedIn } from "../store";
import { User } from "../types/user";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAuth = () => {
  const [isSignedIn, setIsSignedIn] = useRecoilState<boolean>(signedIn);
  const [error] = useState<string | null>();
  const [currentUserData, setCurrentUserDate] =
    useRecoilState<User>(currentUser);

  const signIn = (): void => {
    setIsSignedIn(true);
    setCurrentUserDate(userData);
  };

  const signOut = (): void => {
    setIsSignedIn(false);
    setCurrentUserDate({} as User);
  };

  return { isSignedIn, currentUserData, error, signIn, signOut };
};

export default useAuth;
