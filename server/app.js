'use-strict'

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

let app = express()

const startServer = function () {
  mongoose.Promise = global.Promise
  mongoose.connect(process.env.MONGO_URI)

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use('/api', require('./routes'))

  if (process.env.NODE_ENV !== 'development') {
    app.use(express.static(path.join(__dirname, '../dist')))

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'))
    })
  }

  const port = process.env.PORT || 3000
  app.listen(port, () => console.log('Running on localhost:', port))
}

module.exports = startServer
