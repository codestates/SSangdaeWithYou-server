const { user, smokePlace, message, likeOrDislike } = require('../../models');

module.exports = {
  getDetail: async (req, res) => {
    // console.log("id2    : " + req.session.id)
    if (!req.session.identifier) {
      res.sendStatus(400);
    } else {
    // placeName, comment, nickname, => 1 : N
    const { placeId } = req.body; 
    const info = await user.findAll({ 
      attributes: ['nickname'],
      include:[{
        attributes: ['placeName', 'comment'],
        model: smokePlace,
        where: { 
          'id': placeId 
        }
      }]
      
    })
    .catch(err => res.status(400).send(err))
    if (info) {
      let result = Object.assign({nickname: info[0].dataValues.nickname}, info[0].dataValues.smokePlaces[0].dataValues);
     
      res.status(200).send(result)
    } 
  }
  },
  // islike, isDislike, placeId => 해당 장소의 갯수 파악 가능하니까 => smokePlace + like~ => 1 : n
  getLikeInfo: async (req, res) => {
    if (!req.session.identifier) {
      res.sendStatus(400);
    } else {

    const { placeId } = req.body; 
    const result = await likeOrDislike.findAndCountAll({
      where: { smokePlaceId: placeId, isLike: 1 }
    })
    .catch(err => res.sendStatus(500));

    if(result) {
      res.status(200).send({'count': result.count})
    }
  }
  },
  getDislikeInfo: async (req, res) => {
    if (!req.session.identifier) {
      res.sendStatus(400);
    } else {

    const { placeId } = req.body; 
    const result = await likeOrDislike.findAndCountAll({
      where: { smokePlaceId: placeId, isDislike: 1 }
    })
    .catch(err => res.sendStatus(500));

    if(result) {
      res.status(200).send({'count': result.count})
    }
  }},
  getMessage: async (req, res) => {
    if (!req.session.identifier) {
      res.sendStatus(400);
    } else {

    // (댓글) placeId, nickname, message => smokePlaces + users + messages => n : n
    const { placeId } = req.body; 
    const result = await user.findAll({
      attributes: [ 'nickname' ],
      include: {
        model: message,
        attributes: [ 'message'],
        where: { 'smokePlaceId': placeId }
      }
    })
    .catch(err => res.sendStatus(500));;

    if (result) {
      let data = [];
      for(let k = 0; k < result.length; k++) {
        for(let i = 0; i < result[k].messages.length; i++) {
          
          data.push({nickname: result[k].dataValues.nickname, message:result[k].messages[i].dataValues.message})
        }
      }    
      res.status(200).send(data)
    } else {
      res.status(200).send('메세지가 없습니다.')
    }
  }},
  getAllData: async (req, res) => {
    const data = await smokePlace.findAll().catch(err => res.sendStatus(400));
    res.status(200).send(data);
  }

    
  
}
