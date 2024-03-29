const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const upload = require('../middleware/upload.middleware');


//Authentification 
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.put('/forgot-password', authController.changePassword);
router.get('/logout', authController.logout);


//user profil 
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.UpdateUser);
router.delete('/:id', userController.deleteUser);

//Upload file
router.post('/:id/upload', upload.single('profil'), uploadController.uploadProfil);
router.post('/:id/upload/cover', upload.single('cover'), uploadController.uploadCoverProfil);

module.exports = router;