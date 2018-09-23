'use strict'

const express = require('express')
const _ = require('lodash')
const router = express.Router()

router.post('/', function (req, res, next) {
  var accessString = ''

  _.forOwn(req.body, function (value, key) {
    accessString += '&' + key + '=' + value
  })

  res.redirect('http://localhost:8080/#/callback?authorize' + accessString)
})

module.exports = router
