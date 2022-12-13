const mongoose = require('mongoose')

const itemsModel = mongoose.Schema({
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
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'task',
    required: true
  },
  creador: {
    type: String,
    required: true
  },
  created_At: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

module.exports = mongoose.model('item', itemsModel)
