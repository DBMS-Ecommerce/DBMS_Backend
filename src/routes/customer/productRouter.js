const express = require('express'),
router = express.Router();
const productController = require('../../controllers/customer/productController')

router.get('/:id',productController);

module.exports = router;