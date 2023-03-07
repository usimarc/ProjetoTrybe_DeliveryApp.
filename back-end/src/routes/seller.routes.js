const { Router } = require('express');
const sellerController = require('../controllers/seller.controller');

const router = Router();

router.get('/', sellerController.getAll);

module.exports = router;