const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 5000;
const route = require('./routes');
app.use(cors({
  credentials: true // 이 부분을 설정해줘야 쿠키를 요청에 추가함
}));

app.use(bodyParser.json());

// express-session
app.use(
  session({
    secret: '@codestates',
    resave: false,
    saveUninitialized: true, // false 로 설정해주면 cookie가 오지 않음
    cookie: {
      domain: 'localhost',
      path: '/',
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: 'none',
      httpOnly: true,
      secure: true
    }
  })
)

app.use('/', route);

app.listen(port);
