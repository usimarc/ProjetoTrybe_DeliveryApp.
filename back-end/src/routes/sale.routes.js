const { Router } = require('express');
const saleController = require('../controllers/sale.controller');
const validateToken = require('../middleware/validateToken');

const router = Router();

router.get('/:id', validateToken, saleController.getSaleById);
router.get('/', validateToken, saleController.getAllSalesByUser);
router.post('/', validateToken, saleController.create);
router.patch('/:id', validateToken, saleController.updateSale);

module.exports = router;