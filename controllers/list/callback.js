// require('dotenv').config();

// const clientID = process.env.KAKAO_RESTAPI_KEY;
// const clientSecret = process.env.KAKAO_RESTAPI_SECRET;
const { user } = require('../../models');
const axios = require('axios');
module.exports =async (req, res) => {
  const access = await axios({
    method: 'POST',
    url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=41920d05f8b54e037d992edc47bb99c2&redirect_uri=https://ssangdaewithyou.com&code=${req.body.authorizationCode}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  }).catch((err) => {
      return res.sendStatus(400);
    });
    
    console.log('access :   ' + access.data.access_token);

    axios
    .get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access.data.access_token}`,
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then((response) => {
      //response.data;
      const username = response.data.id; //12312312
      const nickname = response.data.kakao_account.profile.nickname;
      const email = response.data.kakao_account.email;

      return user
        .findOrCreate({
          where: { email },
          defaults: { username, nickname },
        })
        .then(([user, created]) => {
          if (!created) {
            res.cookie('id', username, {
              domain: 'ssangdae.gq',
              // domain: 'ssangdae.gq',
              path: '/',
              sameSite: 'none',
              httpOnly: true,
              secure: true, //true였음 원래 꼭 기억하도록!
            });
           return res.status(200).send('로그인이 되었습니다');
          } else {
            res.cookie('id', username, {
              domain: 'ssangdae.gq',
              // domain: 'ssangdae.gq',
              path: '/',
              sameSite: 'none',
              httpOnly: true,
              secure: true, //true였음 원래 꼭 기억하도록!
            });
	   return res.status(200).send('로그인이 되었습니다');
          }
        })
        .catch((err) => res.sendStatus(400));
    })
     .catch(err => res.status(500).send('에러'));
};
