const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 5000;
const controller = require('../SSangdaeWithYou-server/controllers/listDetailButtons');

app.use(cors());

app.use(bodyParser.json());

app.post('/list/detail/like', controller.likeBtn);
app.post('/list/detail/dislike', controller.disLikeBtn);

app.get('/', (req, res) => {
  res.send({ data: '첫 방문 축하드립니다.' });
});

// https
// .createServer(
//   {
//     key: fs.readFileSync(__dirname + '/key.pem', 'utf-8'),
//     cert: fs.readFileSync(__dirname + '/cert.pem', 'utf-8'),
//   },
//   app.use('/', (req, res) => {
//     res.send('Congrats! You made https server now :)');    })
// )
app.listen(port);
