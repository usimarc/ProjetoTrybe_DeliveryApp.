const { Router } = require('express');
const userController = require('../controllers/user.controller');

const router = Router();

router.post('/login', userController.login);
router.post('/register', userController.createUser);
router.get('/users', userController.getAllUsers);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;