const { Schema } = require('mongoose')
const db         = require('../db')

const seansModel = db.model('seanses', {
  date: {
    type: String
  },
  _teas: {
      type: [db.Schema.Types.ObjectId],
      ref: 'teas'
    },
  _owner: {
    type: db.Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = seansModel