const router = require('express').Router();

const messageController = require('../controllers/message.controller');


router.get('/:id', messageController.readMessage);
router.post('/:id', messageController.createMessage);
router.put('/;id', messageController.updateMessage);
router.delete('/:id', messageController.deleteMessage);