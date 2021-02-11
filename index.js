const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const route = require('./routes/index');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port = 5000;
const controllerInfo = require('./controllers/users/userInfo');
const controllerSign = require('./controllers/users/userSign');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'https://ssangdaewithyou.com',
    ],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    credentials: true,
  })
);
// express-session
// app.use(
//   session({
//     secret: '@codestates',
//     resave: false,
//     saveUninitialized: true, // false 로 설정해주면 cookie가 오지 않음
//     cookie: {
//       domain: 'localhost:3000',
//       // domain: 'ssangdae.gq',
//       path: '/',
//       maxAge: 24 * 6 * 60 * 10000,
//       sameSite: 'none',
//       httpOnly: true,
//       secure: false, //https
//     },
//   })
// );

app.post('/user/info', controllerInfo.userinfo);
app.post('/user/sign', controllerSign.sign);
// process.on('uncaughtException', (err) => {console.log(err)})
app.use('/', route);

module.exports = app;
