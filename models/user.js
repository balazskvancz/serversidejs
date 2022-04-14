const db = require('../db')

const UserModel = db.model('users', {
  name: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
})

module.exports = UserModel