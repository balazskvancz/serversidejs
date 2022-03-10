const express = require('express')
const config = require('./config.json')

const app = express();

app.use(express.static('static'));

const { port } = config.http;

app.listen(port, () => {
  console.log(`Listening at port ${ port }`);
});
