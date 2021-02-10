const { user } = require('../../models');

module.exports = {
  signout: async (req, res) => {
    req.session.destroy(err => res.sendStatus(500));
    res.sendStatus(200);
  }
}