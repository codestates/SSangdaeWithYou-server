const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 5000;
const route = require('./routes/index');


// express-session
app.use(
  session({
    secret: '@codestates',
    resave: false,
    saveUninitialized: true, // false 로 설정해주면 cookie가 오지 않음
    cookie: {
      domain: 'ssangdae.gq',
      path: '/',
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: 'none',
      httpOnly: true,  
      secure: false  //https
    },
  })
)
app.use(bodyParser.json());

app.use(cors());



// process.on('uncaughtException', (err) => {console.log(err)})
app.use('/', route);

module.exports = app;
