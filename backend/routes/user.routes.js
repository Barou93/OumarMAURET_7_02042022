const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

router.post('/register', authController.signUp);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.UpdateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;