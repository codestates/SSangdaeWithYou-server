const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const port = 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send({data: '첫 방문 축하드립니다.'});
})

https
  .createServer(
    {
      key: fs.readFileSync(__dirname + '/key.pem', 'utf-8'),
      cert: fs.readFileSync(__dirname + '/cert.pem', 'utf-8'),
    },
    app.use('/', (req, res) => {
      res.send('Congrats! You made https server now :)');
    })
  ).listen(port);


