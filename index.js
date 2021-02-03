const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('첫 방문 축하드립니다.');
})

app.listen(port, () => {
  console.log(port + '접속');
})