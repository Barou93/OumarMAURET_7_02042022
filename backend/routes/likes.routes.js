const router = require('express').Router();

const likeController = require('../controllers/like.controller');


router.patch('/:postId/like-post', likeController.likePost);
router.patch('/:postId/unlike-post', likeController.disLikePost);

module.exports = router;