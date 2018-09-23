const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TODO: make gitUrl unique

var PureObject = new Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [
      /^[a-z]+(_[a-z]+)*$/,
      'Valid names must start/end with a letter and consist of only letters and underscores.'
    ]
  },
  description: { type: String, maxlength: 100 },
  type: {
    type: String,
    validate: [
      /module|component/,
      'Invalid type. Must be [module or component]'
    ]
  },
  gitUrl: String,
  owner: String
})

module.exports = mongoose.model('pure-objects', PureObject)
