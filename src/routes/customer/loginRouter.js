const express = require('express'),
router = express.Router();
const {loginController} = require('../../controllers')


router.post('/',loginController);

module.exports = router;