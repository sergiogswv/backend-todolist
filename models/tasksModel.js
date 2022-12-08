const mongoose = require('mongoose')

const taskModel = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  finished: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('task', taskModel)
