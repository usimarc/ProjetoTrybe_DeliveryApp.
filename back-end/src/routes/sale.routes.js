const { Router } = require('express');
const saleController = require('../controllers/sale.controller');
const validateToken = require('../middleware/validateToken');

const router = Router();

router.get('/', validateToken, saleController.getAllSalesByUser);
router.post('/', validateToken, saleController.create);

module.exports = router;