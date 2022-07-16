const express = require('express'),
router = express.Router();
const orderController = require('../../controllers/customer/orderController')

router.get('/customer/:id',orderController.getOrdersByCustomer);
router.get('/items/:id',orderController.getOrderItemsByOrderId);

router.post('/',orderController.orderMethod);

module.exports = router;