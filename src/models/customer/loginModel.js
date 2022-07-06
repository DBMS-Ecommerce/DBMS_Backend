const db = require('../../config/database');

async function loginUser (req,res){
    const user = {
        userName:req.userName,
        password:req.password
    }
    const userName = user.userName;
    const password = user.password;

    const selectQ = "INSERT  INTO user (userName,password,user_type,user_id) VALUES (?,?,?,?)";
    // const select_query = "SELECT * FROM user WHERE user_id = ? AND password = ?"
    const result = db.query(selectQ,[userName,password,"123qweasd","OWNER"],()=>{
        console.log("never")
    });
    // const result =db.query(select_query,[userName,password]);
    
    if(result.length == 0){
        console.log("No such a user");
        
    }else{
        console.log(result)
        console.log("user exists");
        
    }

}
module.exports = {loginUser};