'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../../controllers/hub')

router.get('/:id', controller.get)
router.get('/', controller.list)

module.exports = router
