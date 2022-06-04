const router = require('express').Router();

const followController = require('../controllers/follow.controller');


router.patch('/follow/:id', followController.follow);

router.patch('/unfollow/:id', followController.unfollow);

module.exports = router;
