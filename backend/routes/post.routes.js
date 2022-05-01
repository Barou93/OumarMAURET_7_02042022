const router = require('express').Router();

const PostController = require('../controllers/post.controller');
const upload = require('../middleware/upload.middleware');



///Post routes

router.get('/', PostController.readPost);
router.get('/:id', PostController.readOnePost);
router.post('/', upload.single('file'), PostController.createPost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);


module.exports = router;