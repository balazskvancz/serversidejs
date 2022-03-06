const express = require('express');
const app = express();

app.use(express.static('static'));

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
