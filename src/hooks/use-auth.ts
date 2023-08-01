import { userData } from "@src/data/user";
import { User } from "@src/types/user";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentUser, signedIn } from "../store";

export const useAuth = () => {
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
