const router = require('express').Router();

const messageController = require('../controllers/message.controller');


router.get('/', messageController.getMessages);
router.post('/new', messageController.createMessage);
router.post('/:id', messageController.sendMessage);
router.patch('/:id', messageController.currentMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;