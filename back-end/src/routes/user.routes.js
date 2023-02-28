const { Router } = require('express');
const userController = require('../controllers/user.controller');

const router = Router();

router.post('/', userController.login);

module.exports = router;