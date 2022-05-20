const db = require('../db')

const teaModel = db.model('teas', {
  name: {
    type: String,
    unique: true
  },
  createdAt: {
    type: String
  }, 
  deleted: {
    type: Number,
    default: 0
  }
})

module.exports = teaModel
