const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 5000;

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {  res.send({ data: '첫 방문 축하드립니다.' });
});


app.listen(port);



