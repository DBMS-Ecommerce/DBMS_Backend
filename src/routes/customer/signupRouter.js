const express = require('express'),
router = express.Router();
const signUpUserController = require('../../controllers/customer/signUpController')
const {validateUser} = require('../../middlewares');

router.post('/',validateUser,signUpUserController);

module.exports = router;
//localhost:5000/signup/user
//localhost:5000/signup/admin