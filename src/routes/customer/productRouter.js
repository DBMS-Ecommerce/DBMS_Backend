const express = require('express'),
router = express.Router();
const productController = require('../../controllers/customer/productController')

router.get('/:id',productController.getProductMethod);
router.get('/var/:id',productController.getProductVariantMethod);

module.exports = router;