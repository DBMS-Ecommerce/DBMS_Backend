const express = require('express'),
router = express.Router();
const {userController} = require('../../controllers')

router.get('/id',userController);
module.exports = router;