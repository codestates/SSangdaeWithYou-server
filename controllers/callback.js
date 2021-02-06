const axios = require('axios');

module.exports = (req, res) => {
  const clientID = process.env.CLILENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  await axios({
    method: 'POST',
    url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientID}&client_secret=${client_secret}&redirect_uri=http://localhost:3000&code=${req.body.authorizationCode}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((data) => {
        const access_token = data.access_token;
      res.status(200).json({access_token: access_token})
    })
    .catch((err) => {
      console.log(err);
    });
}