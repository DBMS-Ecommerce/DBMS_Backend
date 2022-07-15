const loginModel = require('../../models/customer/loginModel');

async function loginUserMethod(req,res){
    
    const result = loginModel.loginUser(req,res)
    res.send(result);
}

module.exports = loginUserMethod