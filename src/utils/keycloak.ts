import { getSignInRedirectUrl } from './auth';

const keycloak = {
  authority: process.env.SSO_AUTHORITY ? process.env.SSO_AUTHORITY : '',
  client_id: process.env.SSO_CLIENT_ID ? process.env.SSO_CLIENT_ID : '',
  redirect_uri: getSignInRedirectUrl(),
};

export default keycloak;
