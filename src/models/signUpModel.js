
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');
const {validateUser} = require('../middlewares')
async function signUpUser (req,res){
    
    const user ={
        userName:req.body.userName,
        password : req.body.password,
        userType : req.body.userType,
        user_id : uuidv4()
    }

    const result = validateUser(user);
    console.log(result)
    if (!result.status) console.log(result.message)
    
    
    const signUpQuery = "INSERT  INTO user (userName,password,user_type,user_id) VALUES (?,?,?,?)"

    db.query(signUpQuery,[user.userName,user.password,user.userType,user.user_id],(err,res)=>{
        if(err){
            console.log("error ",err )
            result(err,null)
            return;

        }else{
            console.log("Item added to the table")
           
            return
        }
    })
}

module.exports = {signUpUser}

