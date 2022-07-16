const express = require('express'),
router = express.Router();
const cartController = require('../../controllers/customer/cartController')

router.post('/add',cartController.addToCartMethod);
router.get('/:uid',cartController.getCartByUserId);

module.exports = router;