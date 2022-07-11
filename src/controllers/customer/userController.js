const {userModel} = require('../../models');

async function getUserByIdMethod(req,res) {
    const result = userModel.getUserById;
    res.send(result);
}

module.exports = getUserByIdMethod;