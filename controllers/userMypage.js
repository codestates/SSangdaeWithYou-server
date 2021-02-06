const axios = require('axios');

module.exports = {
  socialMypage: async (req, res) => {
    let access_token = req.body.access_token;
    await axios
      .get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
      .then((response) => {
        res.status(200).json({
          access_token: access_token,
          userData: response.data,
        });
      })
      .catch((err) => {
        console.log('에러');
      });
  },
  userMypage: (req, rse) => {},
};
