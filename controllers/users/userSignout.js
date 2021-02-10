const { user } = require('../../models');

module.exports = {
  signout: (req, res) => {
    req.session.destroy(()=> {
      req.session.identifier;
    });

  }
}