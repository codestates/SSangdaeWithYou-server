const { user } = require('../models');

module.exports = {
  signup : async (req, res) => {
    const {
      username,
      nickname,
      password,
      email
    } = req.body;
    const result = await user.findOrCreate({
      where: { email },
      defaults : { username, nickname, password }
    });

    const [model, created] = result;
    if (!created) {
      return res.status(400).send("이미 가입된 사용자 입니다.")
    } else {
      return res.status(200).send("회원가입 성공")
    }
  } 
}