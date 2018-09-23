'use strict'

const Version = require('../../models/version')

const versionProjection = {
  __v: false
}

const get = function (req, res, next) {
  Version.find({pureObject: req.params.id}, versionProjection, (err, versions) => {
    if (err) return next(err)
    res.json(versions)
  })
}

module.exports = {
  get: get
}
