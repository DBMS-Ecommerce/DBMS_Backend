const {loginModel} = require('../../models');

async function loginUserMethod(req,res){
    
    const result = loginModel.loginUser(req.res)
    res.send(result);
}

module.exports = loginUserMethod