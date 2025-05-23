import { WebStorageStateStore } from 'oidc-client-ts';
import { getSignInRedirectUrl } from './auth';

const keycloak = {
  authority: import.meta.env.VITE_SSO_AUTHORITY
    ? import.meta.env.VITE_SSO_AUTHORITY
    : '',
  client_id: import.meta.env.VITE_SSO_CLIENT_ID
    ? import.meta.env.VITE_SSO_CLIENT_ID
    : '',
  redirect_uri: getSignInRedirectUrl(),
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

export default keycloak;
