const { user, smokePlace, message, likeOrDislike } = require('../../models');

module.exports = {
  getDetail: async (req, res) => {
    // console.log("id2    : " + req.session.id)
    if (!req.cookies.id) {
      res.sendStatus(400);
    } else {
      // placeName, comment, nickname, => 1 : N
      const { placeId } = req.body;
      const info = await user
        .findAll({
          attributes: ['nickname'],
          include: [
            {
              attributes: ['placeName', 'comment'],
              model: smokePlace,
              where: {
                id: placeId,
              },
            },
          ],
        })
        .catch((err) => res.status(400).send(err));
      if (info.length !== 0) {
        let result = Object.assign(
          { nickname: info[0].dataValues.nickname },
          info[0].dataValues.smokePlaces[0].dataValues
        );

        res.status(200).send(result);
      } else {
        res.status(400).send('장소가 없습니다');
      }
    }
  },
  // islike, isDislike, placeId => 해당 장소의 갯수 파악 가능하니까 => smokePlace + like~ => 1 : n
  getLikeInfo: async (req, res) => {
    if (!req.cookies.id) {
      res.sendStatus(400);
    } else {
      const { placeId } = req.body;
      const result = await likeOrDislike
        .findAndCountAll({
          where: { smokePlaceId: placeId, isLike: 1 },
        })
        .catch((err) => res.sendStatus(500));

      if (result.length !== 0) {
       return res.status(200).send({ count: result.count });
      } else {
       return res.status(400).send('장소가 없습니다');
      }
    }
  },
  getDislikeInfo: async (req, res) => {
    if (!req.cookies.id) {
      res.sendStatus(400);
    } else {
      const { placeId } = req.body;
      const result = await likeOrDislike
        .findAndCountAll({
          where: { smokePlaceId: placeId, isDislike: 1 },
        })
        .catch((err) => res.sendStatus(500));
      console.log(result);
      if (result.length !== 0) {
        res.status(200).send({ count: result.count });
      } else {
        res.status(400).send('장소가 없습니다');
      }
    }
  },
  getMessage: async (req, res) => {
    if (!req.cookies.id) {
      res.status(400).send('로그인 후 이용해주세요');
    } else {
      // (댓글) placeId, nickname, message => smokePlaces + users + messages => n : n
      const { placeId } = req.body;
      const result = await user
        .findAll({
          attributes: ['nickname'],
          include: {
            model: message,
            attributes: ['message'],
            where: { smokePlaceId: placeId },
          },
          order: [[ message, 'createdAt', 'DESC']],
        })
        .catch((err) => res.sendStatus(500));
      console.log(result);
      if (result.length !== 0) {
        let data = [];
        for (let k = 0; k < result.length; k++) {
          for (let i = 0; i < result[k].messages.length; i++) {
            data.push({
              nickname: result[k].dataValues.nickname,
              message: result[k].messages[i].dataValues.message,
            });
          }
        }
        res.status(200).send(data);
      } else {
        res.status(200).send('메세지가 없습니다.');
      }
    }
  },
  getAllData: async (req, res) => {
    const data = await smokePlace.findAll().catch((err) => res.sendStatus(400));
    res.status(200).send(data);
  },
};
