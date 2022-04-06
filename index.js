const express = require('express')
const config = require('./config.json')

const app = express()

app.set('views', [
  __dirname + '/views/auth/',
  __dirname + '/views/navbar/',
  __dirname + '/views/partials/', 
  __dirname + '/views/seanses',
])

app.set('view engine', 'ejs')

// Honnan szolgálja ki a statikus fájljainkat.
app.use('/static', express.static(__dirname + '/static'))

// Routeolás.
require('./route/index')(app)


const { port } = config.http

app.listen(port, () => {
  console.log(`Listening at port ${ port }`)
})
