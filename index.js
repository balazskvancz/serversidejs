const express      = require('express')
const session      = require('express-session');
const bodyParser   = require('body-parser');
const config       = require('./config.json')
const router       = require('./route/index')

const app = express()

// Session config.
app.use(
  session({
    secret: 'secret-key',
    saveUninitialized: true,
    resave: true
  })
)

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Beállítom, hol kell keresni a nézeteket.
app.set('views', [
  __dirname + '/views/auth/',
  __dirname + '/views/navbar/',
  __dirname + '/views/partials/', 
  __dirname + '/views/seanses',
  __dirname + '/views/teas',
])

app.set('view engine', 'ejs')

// Honnan szolgálja ki a statikus fájljainkat.
app.use('/static', express.static(__dirname + '/static'))

// Routeolás.
router(app)

const { port } = config.http

app.listen(port, () => {
  console.log(`Listening at port ${ port }`)
})
