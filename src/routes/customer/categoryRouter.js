const express = require('express'),
router = express.Router();
const {categoryController} = require('../../controllers')

router.get('/all',categoryController);

module.exports = router;