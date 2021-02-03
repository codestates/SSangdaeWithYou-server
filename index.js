const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send({data: '첫 방문 축하드립니다.'});
})

app.listen(port, () => {
  console.log(port + '접속');
})