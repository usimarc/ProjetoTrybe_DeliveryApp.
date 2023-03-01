const { Router } = require('express');
const productController = require('../controllers/product.controller');

const router = Router();

router.get('/', productController.getall);

module.exports = router;