import { getSignInRedirectUrl } from '@src/utils/auth';
import axios from '@src/utils/axios';
import { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useAuth as useKeycloakAuth } from 'react-oidc-context';
import { currentUserState, signedInState } from '../store';
import { User } from '../types/user';

const useAuth = () => {
  const auth = useKeycloakAuth();
  const [isSignedIn, setIsSignedIn] = useAtom<boolean>(signedInState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();
  const [currentUserData, setCurrentUserData] = useAtom<User | undefined>(
    currentUserState,
  );

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
    setIsLoading(auth.isLoading);
  }, [auth.isLoading, setIsLoading]);

  useEffect(() => {
    const profile = auth.user?.profile;
    if (auth.isAuthenticated && profile && !currentUserData) {
      setCurrentUserData({
        firstName: profile.given_name,
        lastName: profile.family_name,
        displayName: profile.name,
        emailAddress: profile.email,
        phoneNumber: profile.phone_number,
      });
    }
  }, [
    auth.isAuthenticated,
    auth.user?.profile,
    currentUserData,
    setCurrentUserData,
  ]);

  useEffect(() => {
    if (auth.error) {
      setError(auth.error.message);
      setIsSignedIn(false);

      // eslint-disable-next-line no-console
      console.error('Error:', auth.error);
    }
  }, [auth.error, setIsSignedIn]);

  const signIn = async (
    username: string,
    password: string,
  ): Promise<AxiosResponse> => {
    auth.error = undefined;
    return axios
      .post('/auth/signin', {
        username,
        password,
      })
      .then((response) => {
        const { data, status } = response;
        if (status === 200) {
          setIsSignedIn(true);
          setCurrentUserData({
            firstName: data.first_name,
            lastName: data.last_name,
            displayName: data.display_name,
            emailAddress: data.email_address,
            phoneNumber: data.phone_number,
          });
        }
        return response;
      })
      .catch((error) => {
        setError(error.message);
        setIsSignedIn(false);
        setCurrentUserData({} as User);
        // eslint-disable-next-line no-console
        console.error('Error:', error);
        throw error;
      });
  };

  const signInWithSso = (): void => {
    auth.signinRedirect({ redirect_uri: getSignInRedirectUrl() });
  };

  const signOut = (): void => {
    setIsSignedIn(false);
    setCurrentUserData({} as User);
    if (auth.isAuthenticated) {
      auth.signoutRedirect({
        post_logout_redirect_uri: getSignInRedirectUrl(),
      });
    } else {
      setIsSignedIn(false);
      setCurrentUserData({} as User);
    }
  };

  return {
    isSignedIn,
    isLoading,
    currentUserData,
    error,
    signIn,
    signInWithSso,
    signOut,
  };
};

export default useAuth;
