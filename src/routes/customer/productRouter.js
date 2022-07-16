const express = require('express'),
router = express.Router();
const productController = require('../../controllers/customer/productController')

router.get('/default/:id',productController.getDefaultProductVarById);
router.get('/variants/:id',productController.getProductVarsById);
router.get('/subcategory/:id',productController.getAllProductsBySubCat);
router.post('/variant-price/',productController.getPriceByVariants);
router.post('/search',productController.searchByTitle);

module.exports = router;