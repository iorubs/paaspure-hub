const mongoose = require('mongoose')
const Schema = mongoose.Schema

var PureObjectVersion = new Schema({
  tag: Number,
  pureObject: Schema.Types.ObjectId,
  commit: String,
  readme: String,
  date: String
})

module.exports = mongoose.model('versions', PureObjectVersion)
