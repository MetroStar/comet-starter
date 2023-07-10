const keycloak = {
  authority: process.env.SSO_AUTHORITY ? process.env.SSO_AUTHORITY : '',
  client_id: process.env.SSO_CLIENT_ID ? process.env.SSO_CLIENT_ID: '',
  redirect_uri: process.env.SSO_REDIRECT_URI ? process.env.SSO_REDIRECT_URI : '',
};

export default keycloak;