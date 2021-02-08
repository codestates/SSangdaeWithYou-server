const { user } = require('../models');

module.exports = {
  signout: async (req, res) => {

    req.session.destroy(err => console.log(err))

    res.redirection('/user/sign');
  }

 
}