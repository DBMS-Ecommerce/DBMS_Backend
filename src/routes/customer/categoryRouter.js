const express = require('express'),
router = express.Router();
const categoryController = require('../../controllers/customer/categoryController')

router.get('/all',categoryController.getAllCatMethod);
router.get('/all_sub',categoryController.getSubCatMethod);

module.exports = router;