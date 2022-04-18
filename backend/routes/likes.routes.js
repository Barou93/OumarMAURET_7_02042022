const router = require('express').Router();

const likeController = require('../controllers/like.controller');


router.put('/:postId/like-post', likeController.likePost);
router.put('/:postId/unlike-post', likeController.disLikePost);


module.exports = router;