const keycloak = {
  authority: process.env.SSO_AUTHORITY ? process.env.SSO_AUTHORITY : '',
  client_id: process.env.SSO_CLIENT_ID ? process.env.SSO_CLIENT_ID : '',
};

export default keycloak;
