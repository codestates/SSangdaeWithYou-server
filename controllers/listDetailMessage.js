const { smokeplace, user, messages } = require('../models');

module.exports = {
  inputMessage: async (req, res) => {
    const { message, placeId } = req.body;
    const { email } = req.session.userid;
    const userData = user.findOne({
      where: {
        email: email,
      },
    });

    messages.create({
      placeId: placeId,
      userId: userData.id,
      message: message,
    });
    res.status(200).send('ok');
  },
};
