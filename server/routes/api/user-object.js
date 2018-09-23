'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../../controllers/user-object')
const jwtCheck = require('../../utils/auth')

router.use(jwtCheck)

router.post('/', controller.create)
router.put('/:id', controller.update)
router.get('/', controller.list)
router.delete('/:id', controller.remove)
router.post('/:id', controller.release)

module.exports = router
