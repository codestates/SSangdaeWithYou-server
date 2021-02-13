const { smokePlace, user, likeOrDislike } = require('../../models');
module.exports = {
  likeBtn: async (req, res) => {
    const { placeId } = req.body;
    const numberPlaceId = parseInt(placeId);
    const username = req.cookies.id;
    const data = await user.findOne({
      where: {
        username: username,
      },
    });
    const userId = data.dataValues.id;
    likeOrDislike
      .findOne({
        attributes: ['userId', 'smokePlaceId', 'isLike', 'isDislike'],
        where: {
          smokePlaceId: numberPlaceId,
          userId: userId,
        },
      })
      .then((data) => {
        if (data) {
          if (data.isDislike) {
            res.status(202).send('좋아요와 싫어요를 둘 다 누르실 수 없습니다.');
          } else {
            likeOrDislike
              .destroy({
                where: {
                  smokePlaceId: numberPlaceId,
                  userId: userId,
                },
              })
              .then((number) => {
                res.status(201).json({
                  isLike: null,
                  data: '좋아요가 취소되었습니다',
                });
              })
              .catch((err) => res.status(400).send(err));
          }
        } else {
          likeOrDislike
            .create({
              userId: userId,
              smokePlaceId: numberPlaceId,
              isLike: 1,
            })
            .then((data) => {
              res.status(200).json({
                isLike: 1,
                data: 'ok',
              });
            })
            .catch((err) => res.status(400).send(err));
        }
      })
      .catch((err) => res.status(500).send(err));
  },
  disLikeBtn: async (req, res) => {
    const { placeId } = req.body;
    const numberPlaceId = parseInt(placeId);
    const username = req.cookies.id;
    const data = await user.findOne({
      where: {
        username: username,
      },
    });
    const userId = data.dataValues.id;
    likeOrDislike
      .findOne({
        attributes: ['userId', 'smokePlaceId', 'isLike', 'isDislike'],
        where: {
          smokePlaceId: numberPlaceId,
          userId: userId,
        },
      })
      .then((data) => {
        if (data) {
          if (data.isLike) {
            res.status(202).send('좋아요와 싫어요를 둘 다 누르실 수 없습니다.');
          } else {
            likeOrDislike
              .destroy({
                where: {
                  smokePlaceId: numberPlaceId,
                  userId: userId,
                },
              })
              .then((number) => {
                res.status(201).json({
                  isDislike: null,
                  data: '싫어요가 취소되었습니다',
                });
              })
              .catch((err) => res.status(400).send(err));
          }
        } else {
          likeOrDislike
            .create({
              userId: userId,
              smokePlaceId: numberPlaceId,
              isDislike: 1,
            })
            .then((data) =>
              res.status(200).json({
                isDislike: 1,
                data: 'ok',
              })
            )
            .catch((err) => res.status(400).send(err));
        }
      })
      .catch((err) => res.status(500).send(err));
  },
};
