const loginModel = require('../../models/customer/loginModel');

async function loginUserMethod(req,res){
    
    const result = loginModel.loginUser(req,res)
    
}

module.exports = loginUserMethod