const { Router } = require('express');
const adminController = require('../controllers/admin.controller');
const validateToken = require('../middleware/validateToken');

const router = Router();

router.post('/register', validateToken, adminController.createUser);

module.exports = router;