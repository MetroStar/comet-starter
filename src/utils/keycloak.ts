import { WebStorageStateStore } from 'oidc-client-ts';
import { getSignInRedirectUrl } from './auth';

const keycloak = {
  authority: process.env.SSO_AUTHORITY ? process.env.SSO_AUTHORITY : '',
  client_id: process.env.SSO_CLIENT_ID ? process.env.SSO_CLIENT_ID : '',
  redirect_uri: getSignInRedirectUrl(),
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

export default keycloak;
