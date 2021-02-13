const { smokePlace, sequelize } = require('../../models');

module.exports = {
  listController: async (req, res) => {
    let radius = 1000;
    let result = [];
    const lat = parseFloat(req.body.latitude);
    const lng = parseFloat(req.body.longitude);

    smokePlace
      .findAll({
        attributes: [
          'id',
          'placeName',
          'latitude',
          'longitude',
          [
            sequelize.fn(
              'ST_Distance_Sphere',
              sequelize.fn(
                'POINT',
                sequelize.col('longitude'),
                sequelize.col('latitude')
              ),
              sequelize.fn('POINT', lng, lat)
            ),
            'distance',
          ],
        ],
        orderBy: 'distance ASC',
        limit: 10,
      })
      .then(async (place) => {
        for (let i = 0; i < place.length; i++) {
          if (place[i].dataValues.distance <= radius) result.push(place[i]);
        }
        res.status(200).json(result);
      })
      .catch((err) => res.status(400).json(err));
  },
};