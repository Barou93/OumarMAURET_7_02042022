const router = require('express').Router();

const PostController = require('../controllers/post.controller')


///Post routes

router.get('/', PostController.readPost);
router.post('/', PostController.createPost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

module.exports = router;