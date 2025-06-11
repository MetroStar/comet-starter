import { getSignInRedirectUrl } from '@src/utils/auth';
import axios from '@src/utils/axios';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useAuth as useKeycloakAuth } from 'react-oidc-context';
import {
  setCurrentUser,
  setSignedIn,
  signOut as signOutAction,
} from '../store';
import { User } from '../types/user';
import { useAppDispatch, useAppSelector } from './redux';

const useAuth = () => {
  const auth = useKeycloakAuth();
  const dispatch = useAppDispatch();
  const { isSignedIn, currentUser: currentUserData } = useAppSelector(
    (state) => state.auth,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

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
      dispatch(setSignedIn(true));
    }
  }, [auth.isAuthenticated, dispatch]);

  useEffect(() => {
    setIsLoading(auth.isLoading);
  }, [auth.isLoading, setIsLoading]);

  useEffect(() => {
    const profile = auth.user?.profile;
    if (profile && !currentUserData) {
      dispatch(
        setCurrentUser({
          firstName: profile.given_name,
          lastName: profile.family_name,
          displayName: profile.name,
          emailAddress: profile.email,
          phoneNumber: profile.phone_number,
        }),
      );
    }
  }, [auth.user?.profile, currentUserData, dispatch]);

  useEffect(() => {
    if (auth.error) {
      setError(auth.error.message);
      dispatch(setSignedIn(false));

      // eslint-disable-next-line no-console
      console.error('Error:', auth.error);
    }
  }, [auth.error, dispatch]);

  const signIn = async (
    username: string,
    password: string,
  ): Promise<AxiosResponse> => {
    auth.error = undefined;
    return axios
      .post('/auth/signin', { username, password })
      .then((response) => {
        const { data, status } = response;
        if (status === 200) {
          dispatch(setSignedIn(true));
          dispatch(
            setCurrentUser({
              firstName: data.first_name,
              lastName: data.last_name,
              displayName: data.display_name,
              emailAddress: data.email_address,
              phoneNumber: data.phone_number,
            }),
          );
        }
        return response;
      })
      .catch((error) => {
        setError(error.message);
        dispatch(setSignedIn(false));
        dispatch(setCurrentUser({} as User));
        // eslint-disable-next-line no-console
        console.error('Error:', error);
        throw error;
      });
  };

  const signInWithSso = (): void => {
    auth.signinRedirect({ redirect_uri: getSignInRedirectUrl() });
  };

  const signOut = (): void => {
    dispatch(signOutAction());
    if (auth.isAuthenticated) {
      auth.signoutRedirect({
        post_logout_redirect_uri: getSignInRedirectUrl(),
      });
    } else {
      dispatch(signOutAction());
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
