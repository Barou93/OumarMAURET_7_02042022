const router = require('express').Router();

const forumController = require('../controllers/forum.controller');

const forumMessageController = require('../controllers/forumMessage.controller');

router.post('/create', forumController.createGroup);
router.put('/:id', forumController.updateGroup);
router.post('/:id/add', forumController.addMembers);
router.get('/', forumController.getAllGroups);
router.get('/:id', forumController.getGroupMembers);
router.post('/:id', forumMessageController.sendGroupMessage);
router.patch('/:id', forumController.deleteMembers);
router.patch('/:id', forumController.leaveGroup);
router.delete('/:id', forumController.deleteGroup);

module.exports = router;
