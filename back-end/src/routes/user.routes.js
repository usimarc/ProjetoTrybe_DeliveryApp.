const { Router } = require('express');
const userController = require('../controllers/user.controller');
const validateToken = require('../middleware/validateToken');
const validateAdmin = require('../middleware/validateAdmin');

const router = Router();

router.post('/login', userController.login);
router.post('/register', userController.createUser);
router.get('/users', validateToken, userController.getAllUsers);
router.delete('/users/:id', validateToken, validateAdmin, userController.deleteUser);

module.exports = router;