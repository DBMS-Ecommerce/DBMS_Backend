const express = require('express'),
router = express.Router();
const cartController = require('../../controllers/customer/cartController')

router.post('/add',cartController.addToCartMethod);

module.exports = router;