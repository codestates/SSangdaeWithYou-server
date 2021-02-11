const { user } = require('../../models');

module.exports = {
  signout: (req, res) => {
    res.clearCookie('id');
    res.sendStatus(200);
  },
};
