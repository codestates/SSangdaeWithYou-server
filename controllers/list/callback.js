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
      console.log(err);
    });

  console.log(access)



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
      })``
      .then(async ([user, created]) => {
        if (!created) {
          req.session.identifier = username;
        } else {
          req.session.identifier = username;
        }
      })
      .catch(err => console.log(err));
      })
   
 
    console.log(info);

    //! 로그아웃! 
    // const logout = await axios({
    //   method: 'POST',
    //   url: "https://kapi.kakao.com/v1/user/unlink",
    //   headers: {
    //     Authorization: `Bearer ${access}`
    //   },
    // })
    // .catch(err => console.log(err))
};


// module.exports = async (req, res) => {
//   console.log("callback!!!! " + req.body.authorizationCode);
//   let getToken = await axios({
//     method: "POST",
//     url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientID}&client_secret=${clientSecret}&redirect_uri=http://localhost:3000&code=${req.body.authorizationCode}`,
//     headers: {
//       "content-type":"application/x-www-form-urlencoded;charset=UTF-8",
//     }
    
//   })
//   .then(res => res.data.access_token)
//   .catch(err => {
//     console.log("에러다!2222")
//     //res.status(404).send(err)
//   })

//   console.log("토큰 :" + getToken)
//   // res.status(200).json({'token': getToken.data.access_token});
  
//   // let getInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
//   //   headers: {
//   //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
//   //     "Authorization": `Bearer ${getToken.data.access_token}` 
//   //   }
//   // }).catch(err => console.log("에러111"));
//   let getInfo = await axios({
//     method: "GET",
//     url: "https://kapi.kakao.com/v2/user/me",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
//        Authorization: `Bearer ${getToken}` 
//     }
//   })
//   .then(result => result.data)
//   .catch(err => console.log("에러111"));

//   console.log(getInfo);


// }
