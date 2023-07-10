import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
    url: process.env.SSO_ISSUER_URL ? process.env.SSO_ISSUER_URL : '',
    realm: process.env.SSO_KEYCLOAK_REALM ? process.env.SSO_KEYCLOAK_REALM : '',
    clientId: process.env.SSO_CLIENT_ID ? process.env.SSO_CLIENT_ID : '',
  })

export default keycloak;