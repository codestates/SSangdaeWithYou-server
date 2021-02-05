const { smokeplace, user } = require('../models');

module.exports = {
  placeUpload: (req, res) => {
    const { userId, longitude, latitude, email, comment, placeName } = req.body;
    smokeplace
      .findOrCreate({
        where: {
          longitude: longitude,
          latitude: latitude,
        },
        default: {
          userId: userId,
          comment: comment,
          placeName: placeName,
        },
      })
      .then(async ([smokeplace, created]) => {
        if (!created) {
          return res.status(400).send('이미 추가된 장소입니다');
        } else {
          res.statsu(200).send('리스트가 추가되었습니다');
        }
      })
      .catch((err) => res.status(400).send(err));
  },
};
