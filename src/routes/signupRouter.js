const express = require('express'),
router = express.Router();
const {signUpUserController} = require('../controllers')


router.post('/',signUpUserController);

module.exports = router;