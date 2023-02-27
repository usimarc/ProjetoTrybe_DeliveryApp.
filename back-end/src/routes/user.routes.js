const loginController = require('../controllers/user.controller')
const { Router } = require('express');


const router = Router();

router.get('/', loginController);

module.exports = router;




