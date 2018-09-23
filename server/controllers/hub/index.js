'use strict'

const PureObject = require('../../models/pure-object')

const sampleObjectProjection = {
  __v: false
}

const get = function (req, res, next) {
  PureObject.findById(req.params.id, sampleObjectProjection, (err, obj) => {
    if (err) return next(err)
    res.json(obj)
  })
}

const list = function (req, res, next) {
  PureObject.find({}, sampleObjectProjection, (err, objList) => {
    if (err) return next(err)
    res.json(objList)
  })
}

module.exports = {
  get: get,
  list: list
}
