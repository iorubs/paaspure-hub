'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../../controllers/version')

router.get('/:id', controller.get)

module.exports = router
