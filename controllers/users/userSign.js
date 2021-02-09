const { user } = require('../../models');

module.exports = {
  sign: async (req, res) => {
    const {
      username,
      password
    } = req.body;

    // 사용자 조회 
    const userInfo = await user.findOne({
      where: { username: username, password: password }
    })
    .catch(err => console.log(err));

    if (!userInfo) {
      // 회원이 아니라면 
      res.status(404).send('존재하지 않는 사용자 입니다.')
    } else {
      // 회원이라면 
      // console.log(userInfo.dataValues.id)
      req.session.identifier = userInfo.dataValues.username; // 세션에 
      res.status(200).send('로그인 성공')
    }
  }
}

// 소셜 로그인 => 유저 정보를 받아오고 (토큰 버려) (email, nickname, id) => 유저 정보를 우리 디비(email, nickname, username, null)에 저장하고 세션을 돌려줌 => 이 세션으로 인해 일반, 소셜 사용자가 동일해짐.

