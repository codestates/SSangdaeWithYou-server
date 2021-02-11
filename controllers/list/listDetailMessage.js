const { smokeplace, user, message } = require('../../models');
module.exports = {
  inputMessage: async (req, res) => {
    const { text, placeId } = req.body;
    // console.log(req.session)

    if (!req.cookies.id) {
      res.status(404).send('로그인 후 이용하세요');
    } else {
      const username = req.cookies.id;

      const userData = await user
        .findOne({
          where: {
            username: username,
          },
        })
        .catch((err) => res.status(400).send('입력값이 잘못되었습니다.'));

      const result = await message
        .create({
          smokePlaceId: placeId,
          userId: userData.dataValues.id,
          message: text,
        })
        .catch((err) => res.status(400).send('입력값이 잘못되었습니다.'));

      res.status(200).send('메세지가 생성되었습니다.');
    }
  },
};
