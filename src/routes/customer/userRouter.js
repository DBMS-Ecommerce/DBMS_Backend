const express = require('express'),
router = express.Router();
const userController = require('../../controllers/customer/userController')

router.get('/:id',userController);
module.exports = router;