const { smokeplace, user } = require('../models');

module.exports = {
  listDetailController: (req, res) => {
    const { userId, placeId } = req.body;
  },
};
