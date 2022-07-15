const db = require('../../config/database');

async function getCustomerById(req,res){
    const cus_id = (req.params.id).toString();
    console.log(cus_id);
    const stmt = "SELECT * FROM `user_profile` WHERE user_id = ?";

    return new Promise((resolve,reject)=>{
        db.query(stmt,[cus_id],function (err, result, fields) {
            if (err)
            throw err;

        if (result.length == 0) {
            console.log("No user exists");
            reject(new Error('No User'));
        
        } else {
            resolve(result);

        }
            })

    })

}

module.exports = {getCustomerById}