export const AUTH_CONFIG = {
  clientID: '29PqYSzzJvhijoACsPFd74zjkIXLGL0t',
  domain: 'paaspure.eu.auth0.com',
  responseType: 'token id_token',
  responseMode: 'form_post',
  redirectUri: 'http://localhost:8080/api/callback',
  audience: 'https://paaspure-hub',
  scope: 'openid profile',
  id_token_key: 'id_token',
  access_token_key: 'access_token'
}
