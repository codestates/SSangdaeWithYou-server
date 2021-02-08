const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 5000;
const controller = require('../SSangdaeWithYou-server/controllers/listDetailButtons');

const controllerSignup = require('./controllers/userSignup')
const controllerInfo = require('./controllers/userInfo');
const controllerSign = require('./controllers/userSign');
const controllerSignout = require('./controllers/userSignout')


const controllerDetail = require('./controllers/listDetail')
const controllerBtn = require('./controllers/listDetailButtons')
const controllerUpload = require('./controllers/placeUpload')
const controllerinputMessage = require('./controllers/listDetailMessage')

const controllerCallback = require('./controllers/callback');

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

//! user
app.post('/user/signup', controllerSignup.signup);
app.post('/user/info', controllerInfo.userinfo);
app.post('/user/sign', controllerSign.sign);
app.post('/user/signout', controllerSignout.signout)

//! list
app.post('/list/detail/getLikeInfo', controllerDetail.getLikeInfo)
app.post('/list/detail/getDislikeInfo', controllerDetail.getDislikeInfo)
app.post('/list/detail/info', controllerDetail.getDetail)
app.post('/list/detail/like', controllerBtn.likeBtn);
app.post('/list/detail/upload',controllerUpload.placeUpload)
app.post('/list/detail/getMessage', controllerDetail.getMessage)
app.post('/list/detail/inputMessage', controllerinputMessage.inputMessage)

app.post('/callback',controllerCallback);

const server = https
  .createServer(
    {
      key: fs.readFileSync('/Users/hyunsoo/Desktop/key.pem', 'utf-8'),
      cert: fs.readFileSync('/Users/hyunsoo/Desktop/cert-pem', 'utf-8'),
    },
    app.use('/', (req, res) => {
      res.send('Congrats! You made https server now :)');    })
  )
  .listen(port);

module.exports = server;

