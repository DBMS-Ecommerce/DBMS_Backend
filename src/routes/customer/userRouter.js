const express = require('express'),
router = express.Router();
const userController = require('../../controllers/customer/userController')

router.get('/:id',userController.getUserByIdMethod);
router.put('/update',userController.updateUser);
module.exports = router;