// require('dotenv').config();

// const clientID = process.env.KAKAO_RESTAPI_KEY;
// const clientSecret = process.env.KAKAO_RESTAPI_SECRET;
const { user } = require('../../models');
const axios = require('axios');
module.exports = async (req, res) => {
  const access = await axios({
    method: 'POST',
    url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=41920d05f8b54e037d992edc47bb99c2&redirect_uri=http://localhost:3000&code=${req.body.authorizationCode}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((data) => {
      return data.data.access_token;
    })
    .catch((err) => {
      res.sendStatus(400)
    });

  



  const info = await axios
    .get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access}`,
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then( async (response) => {
      // return response.data;
      const username = response.data.id; //12312312
      const nickname = response.data.kakao_account.profile.nickname;
      const email = response.data.kakao_account.email;


      await user.findOrCreate({
        where: { email },
        defaults : { username, nickname }
      })
      .then(([user, created]) => {
        if (!created) {
          req.session.identifier = username;
          res.sendStatus(200);
        } else {
          req.session.identifier = username;
          res.sendStatus(200);
        }
      })
      .catch(err =>  res.sendStatus(400));
      })
      .catch(err => res.sendStatus(400));
    }