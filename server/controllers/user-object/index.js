'use strict'

const jwtDecode = require('jwt-decode')
const PureObject = require('../../models/pure-object')
const Version = require('../../models/version')

const objectProjection = {
  __v: false
}

const create = function (req, res, next) {
  var decoded = jwtDecode(req.headers.authorization)
  req.body.owner = decoded.sub

  PureObject.create(req.body, (err, obj) => {
    if (err) return next(err)
    res.json(obj)
  })
}

const update = function (req, res, next) {
  var decoded = jwtDecode(req.headers.authorization)

  PureObject.update({_id: req.params.id, owner: decoded.sub}, req.body, (err, updated) => {
    if (err) return next(err)

    if (updated.n === 0) {
      res.send(401)
    } else {
      res.json(updated)
    }
  })
}

const list = function (req, res, next) {
  var decoded = jwtDecode(req.headers.authorization)

  PureObject.find({owner: decoded.sub}, objectProjection, (err, objList) => {
    if (err) return next(err)
    res.json(objList)
  })
}

const remove = function (req, res, next) {
  var decoded = jwtDecode(req.headers.authorization)

  PureObject.remove({ _id: req.params.id, owner: decoded.sub }, (err, removed) => {
    if (err) return next(err)

    if (removed.n === 0) {
      res.send(401)
    } else {
      res.json(removed)
    }
  })
}

const release = function (req, res, next) {
  var decoded = jwtDecode(req.headers.authorization)

  PureObject.findById(req.params.id, objectProjection)
    .then(object => {
      if (object.owner !== decoded.sub) {
        res.send(401)
      }
    })
    .then(() => {
      return Version.find({pureObject: req.params.id}, objectProjection)
    })
    .then(versionList => {
      req.body.tag = (versionList.length + 1) / 10
      Version.create(req.body, (err, obj) => {
        if (err) return next(err)
        res.json(obj)
      })
    })
}

module.exports = {
  create: create,
  update: update,
  list: list,
  remove: remove,
  release: release
}
