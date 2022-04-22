const router = require('express').Router();

const CommentController = require('../controllers/comment.controller');


router.post('/:postId/comments', CommentController.createCommentPost);
router.get('/:postId/comments', CommentController.readComments);
router.put('/:postId/comments/:id', CommentController.editCommentPost);
router.delete('/:postId/comments/:id', CommentController.deleteCommentPost);

module.exports = router;