const { smokeplace, user, message } = require('../../models');
module.exports = {
  inputMessage: async (req, res) => {

    const { text, placeId } = req.body;
    // console.log(req.session)

    if (!req.session.identifier) {
      res.status(404).send('로그인 후 이용하세요');

    } else {
      const username = req.session.identifier;
      
      const userData = await user.findOne({
        where: {
          username: username,
        },
      })
      .catch(err => console.log(err))

      console.log("id :" + userData)
      const result = await message.create({
        smokePlaceId: placeId,
        userId: userData.dataValues.id,
        message: text,
      })
      .catch(err => console.log(err));
  
      res.status(200).send('메세지가 생성되었습니다.');
    }
    
  },
};
