const { Router } = require('express');
const adminController = require('../controllers/admin.controller');
const validateToken = require('../middleware/validateToken');

const router = Router();

router.get('/users', validateToken, adminController.getAllUsers);
router.post('/register', validateToken, adminController.createUser);
router.delete('/users/:id', validateToken, adminController.deleteUser);

module.exports = router;