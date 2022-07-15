const userModel = require('../../models/customer/userModel');

async function getUserByIdMethod(req,res) {
    const result = await  userModel.getCustomerById(req,res);
    
    res.send(result);
}

module.exports = getUserByIdMethod;