const express = require('express'),
router = express.Router();

const orderController = require('../../controllers/customer/orderController')

router.post('/',orderController);

module.exports = router;