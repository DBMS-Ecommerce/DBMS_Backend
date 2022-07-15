
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const db = require('../../config/database');
const {validateUser} = require('../../middlewares')
var transaction = require('node-mysql-transaction');
var mysql = require('mysql');

async function signUpUser (req,res){

    const user = req.user;
    console.log(user)

    
    const signUpQuery1 = "INSERT  INTO user (userName,password,user_type,user_id,name) VALUES (?,?,?,?,?)"
    const signUpQuery2 = "INSERT  INTO customer (phone_number,address,user_id) VALUES (?,?,?)"
    const checkUser = "select username from user where username = ?";

    return new Promise((resolve,reject)=>{
        db.query(checkUser,[user.userName],function (err, result, fields) {
                if (err)
                    throw err;
                    console.log(result)
                if (result.length != 0) {
                    
                    res.status(400).send("user exists")
                    
                } else {
                    
                    

                    var trCon = transaction({
                        connection: [mysql.createConnection,{
                
                          user: process.env.DB_USER,
                          password: process.env.DB_PASSWORD,
                          database: process.env.DB_DATABASE
                
                        }],
                        dynamicConnection: 32,
                        idleConnectionCutoffTime: 1000,
                        timeout:600
                
                    });
                
                    let chain = trCon.chain();
                
                    chain.
                    on('commit', function(){
                        
                        res.status(200).send("Data Inserted")
                        return "Data Inserted";
                    }).
                    on('rollback', function(err){
                       return "Data Insertion Failed";
                    });
                
                    chain.
                    query(signUpQuery1,[user.userName,user.password,user.userType,user.user_id,user.name]).
                    query(signUpQuery2,[user.phone_number,user.address,user.user_id]);
                    resolve(result);

                }
            })

    })
    
   
        
      
}

module.exports = {signUpUser}

