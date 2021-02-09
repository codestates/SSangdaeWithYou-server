const express = require('express');
const router = express.Router();


const controllerSignup = require('../controllers/users/userSignup')
const controllerInfo = require('../controllers/users/userInfo');
const controllerSign = require('../controllers/users/userSign');
const controllerSignout = require('../controllers/users/userSignout')


const controllerDetail = require('../controllers/list/listDetail')
const controllerBtn = require('../controllers/list/listDetailButtons')
const controllerUpload = require('../controllers/list/placeUpload')
const controllerinputMessage = require('../controllers/list/listDetailMessage')
const controllerCallback = require('../controllers/list/callback');


//! user
router.post('/user/signup', controllerSignup.signup);
router.post('/user/info', controllerInfo.userinfo);
router.post('/user/sign', controllerSign.sign);
router.post('/user/signout', controllerSignout.signout)

//! list
router.post('/list/detail/getLikeInfo', controllerDetail.getLikeInfo)
router.post('/list/detail/getDislikeInfo', controllerDetail.getDislikeInfo)
router.post('/list/detail/info', controllerDetail.getDetail)
router.post('/list/detail/like', controllerBtn.likeBtn);
router.post('/list/detail/disLike', controllerBtn.disLikeBtn);
router.post('/list/detail/upload',controllerUpload.placeUpload)
router.post('/list/detail/getMessage', controllerDetail.getMessage)
router.post('/list/detail/inputMessage', controllerinputMessage.inputMessage)
router.post('/callback',controllerCallback);

module.exports = router;