import { getSignInRedirectUrl } from '@src/utils/auth';
import { useEffect, useState } from 'react';
import { useAuth as useKeycloakAuth } from 'react-oidc-context';
import { useRecoilState } from 'recoil';
import { userData } from '../data/user';
import { currentUser, signedIn } from '../store';
import { User } from '../types/user';

const useAuth = () => {
  const auth = useKeycloakAuth();
  const [isSignedIn, setIsSignedIn] = useRecoilState<boolean>(signedIn);
  const [error, setError] = useState<string | null>();
  const [currentUserData, setCurrentUserDate] = useRecoilState<
    User | undefined
  >(currentUser);

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
  }, [auth.isAuthenticated, setIsSignedIn]);

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
  }, [auth.user?.profile, setCurrentUserDate]);

  const signIn = (isSso: boolean): void => {
    if (isSso) {
      auth
        .signinRedirect({ redirect_uri: getSignInRedirectUrl() })
        .catch((err) => {
          setError(err);
        });
    } else {
      setIsSignedIn(true);
      setCurrentUserDate(userData);
    }
  };

  const signOut = (): void => {
    setIsSignedIn(false);
    setCurrentUserDate({} as User);
    if (auth.isAuthenticated) {
      auth
        .signoutRedirect({
          post_logout_redirect_uri: getSignInRedirectUrl(),
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      setIsSignedIn(false);
      setCurrentUserDate({} as User);
    }
  };

  return { isSignedIn, currentUserData, error, signIn, signOut };
};

export default useAuth;
