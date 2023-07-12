import { useRecoilState } from 'recoil';
import { useAuth as useKeycloakAuth } from 'react-oidc-context';
import { signedIn, currentUser } from '../store';
import { User } from '../types/user';
import { userData } from '../data/user';
import { useEffect, useState } from 'react';
// import axios from '../axios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAuth = () => {
  const auth = useKeycloakAuth();
  const [isSignedIn, setIsSignedIn] = useRecoilState<boolean>(signedIn);
  const [error] = useState<string | null>();
  const [currentUserData, setCurrentUserDate] = useRecoilState<User | undefined>(currentUser);

  /* TODO: Uncomment for interacting with own API, no need to send tokens to external public API */
  // useEffect(() => {
  //   if (auth.user) {
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.user.access_token;
  //   } else {
  //     axios.defaults.headers.common['Authorization'] = undefined;
  //   }
  // }, [auth.user]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      setIsSignedIn(true);
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const profile = auth.user?.profile;
    if (profile) {
      setCurrentUserDate({
        firstName: profile.given_name,
        lastName: profile.family_name,
        displayName: profile.name,
        emailAddress: profile.email,
        phoneNumber: profile.phone_number,
      });
    }
  }, [auth.user?.profile.sid]);

  const signIn = (isSso: boolean): void => {
    if (isSso) {
      auth.signinRedirect();
    } else {
      setIsSignedIn(true);
      setCurrentUserDate(userData);
    }
  };

  const signOut = (): void => {
    if (auth.isAuthenticated) {
      auth.signoutRedirect();
    } else {
      setIsSignedIn(false);
      setCurrentUserDate({} as User);
    }
  };

  return { isSignedIn, setIsSignedIn, currentUserData, error, signIn, signOut };
};

export default useAuth;
