const db = require('../../config/database');

async function loginUser (req,res){

    const user = {
        userName : req.body.userName,
        password : req.body.password
    }

    console.log(user);

    const stmt = "select * from user where username = ? and password = ?";
    db.query(stmt,[user.userName,user.password], (err, result, fields) => {
        if (err) throw err;
        if (result.length == 0 ) {
            console.log("No User");
        }else{
            console.log(result)
        }
    });
    

}
module.exports = {loginUser};