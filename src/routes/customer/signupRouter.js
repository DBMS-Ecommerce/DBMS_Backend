const express = require('express'),
router = express.Router();
const {signUpUserController} = require('../../controllers')
const {validateUser} = require('../../middlewares');

router.post('/',validateUser,signUpUserController);

module.exports = router;