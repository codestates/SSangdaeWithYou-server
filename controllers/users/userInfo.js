const { user } = require('../../models');

module.exports = {
  userinfo: async (req, res) => {
    //console.log(req.session);
    if (!req.cookies.id) {
      // 세션 객체에 식별자가 존재하지 않는다면
      res.status(404).send('로그인 후 이용해주세요');
    } else {
      // 세션 객체에 식별자가 존재한다면
      const id = req.cookies.id;
      const userInfo = await user.findOne({
        where: { username: id },
      });

      const { username, nickname, email } = userInfo.dataValues;
      res.status(200).send({ username, nickname, email });
    }
  },
};
