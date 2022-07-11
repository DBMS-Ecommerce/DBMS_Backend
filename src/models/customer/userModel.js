const db = require('../../config/database');

async function getCustomerById(req,res){
    const cus_id = req.body.id;

    const stmt = "SELECT * FROM user";

    return new Promise((resolve,reject)=>{
        db.query(stmt,function (err, result, fields) {
                if (err)
                    throw err;

                if (result.length == 0) {
                    console.log("No user exists");
                    reject(new Error("No User"));
                } else {
                    console.log(result);
                    resolve(result);

                }
            })

    })

}

module.exports = {getCustomerById}