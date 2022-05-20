const mongoose = require('mongoose');
const config   = require('./config.json')


const dbConnection = `mongodb://${ config.db.host }:${config.db.port }/${ config.db.dbname }`

mongoose.connect(dbConnection, { useNewUrlParser: true })

module.exports = mongoose
