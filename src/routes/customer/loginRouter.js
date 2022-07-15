const express = require('express'),
router = express.Router();
const loginController = require('../../controllers/customer/loginController')


router.post('/',loginController);

module.exports = router;