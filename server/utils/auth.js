'use strict'

const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://paaspure.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://paaspure-hub',
  issuer: 'https://paaspure.eu.auth0.com/',
  algorithms: ['RS256']
})

module.exports = jwtCheck
