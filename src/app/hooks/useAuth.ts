import { useRecoilState } from "recoil";
import { signedIn, currentUser } from "../store";
import { User } from "../auth/types";
import { mockUser } from "../auth/__mocks__/user";

const useAuth = () => {
  const [isSignedIn, setIsSignedIn] = useRecoilState<boolean>(signedIn);
  const [currentUserData, setCurrentUserDate] =
    useRecoilState<User>(currentUser);

  const signIn = () => {
    setIsSignedIn(true);
    setCurrentUserDate(mockUser);
  };

  const signOut = () => {
    setIsSignedIn(false);
    setCurrentUserDate({} as User);
  };

  return { isSignedIn, currentUserData, signIn, signOut };
};

export default useAuth;
