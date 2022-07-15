const signUpUserModel = require('../../models/customer/signUpModel');

async function signUpUserMethod(req,res){
    
    const result = signUpUserModel.signUpUser(req,res);
    
    
    res.send(result);
}

module.exports = signUpUserMethod