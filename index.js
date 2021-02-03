const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  //console.log(port + '접속11111');
  res.send(port + '접속11111');
})

app.listen(port, () => {
  console.log(port + '접속');
})