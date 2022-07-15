const userModel = require('../../models/customer/userModel');

async function getUserByIdMethod(req,res) {
    const result = await  userModel.getCustomerById(req,res);
    
    res.send(result);
}

async function updateUser(req,res) {
    const result = await  userModel.updateCustomer(req,res);
    
}

module.exports = {getUserByIdMethod,updateUser};