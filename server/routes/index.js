'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({ whatchadoin: 'PaaSPure BackEnd' })
})

router.use('/hub', require('./api/hub'))
router.use('/user-objects', require('./api/user-object'))
router.use('/version', require('./api/version'))
router.use('/callback', require('./api/callback'))

module.exports = router
