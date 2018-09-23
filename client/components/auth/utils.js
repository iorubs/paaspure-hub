'use strict'

import decode from 'jwt-decode'
import auth0 from 'auth0-js'
import Router from 'vue-router'
import { AUTH_CONFIG } from './auth0-variables'

export default class AuthService {
  constructor () {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.setSession = this.setSession.bind(this)
    this.requireAuth = this.requireAuth.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }

  auth = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: AUTH_CONFIG.responseType,
    responseMode: AUTH_CONFIG.responseMode,
    redirectUri: AUTH_CONFIG.redirectUri,
    audience: AUTH_CONFIG.audience,
    scope: AUTH_CONFIG.scope
  })

  login () {
    this.auth.authorize()
  }

  getProfile () {
    return decode(localStorage.getItem(AUTH_CONFIG.id_token_key))
  }

  logout () {
    localStorage.removeItem(AUTH_CONFIG.id_token_key)
    localStorage.removeItem(AUTH_CONFIG.access_token_key)

    var router = new Router({
      mode: 'history'
    })

    router.go('/')
  }

  requireAuth (to, from, next) {
    if (!this.isLoggedIn()) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }

  setSession () {
    this.auth.parseHash({ hash: window.location.hash }, function (err, authResult) {
      if (err) {
        return console.log(err)
      }

      localStorage.setItem(AUTH_CONFIG.access_token_key, authResult.accessToken)
      localStorage.setItem(AUTH_CONFIG.id_token_key, authResult.idToken)

      window.location.href = '/'
    })
  }

  isLoggedIn () {
    const idToken = localStorage.getItem(AUTH_CONFIG.id_token_key)
    const idTokenExp = this.getTokenExpirationDate(idToken)
    const accessToken = localStorage.getItem(AUTH_CONFIG.access_token_key)
    const accessTokenExp = this.getTokenExpirationDate(accessToken)
    const now = new Date()

    return !!idToken && !!accessToken && idTokenExp >= now && accessTokenExp >= now
  }

  getAccessToken () {
    return localStorage.getItem(AUTH_CONFIG.access_token_key)
  }

  getTokenExpirationDate (encodedToken) {
    const token = encodedToken !== null ? decode(encodedToken) : {}

    if (!token.exp) { return null }

    const date = new Date(0)
    date.setUTCSeconds(token.exp)

    return date
  }
}
