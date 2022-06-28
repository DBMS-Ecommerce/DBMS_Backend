
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const db = require('../config/database');
const {validateUser} = require('../middlewares')
var transaction = require('node-mysql-transaction');
var mysql = require('mysql');
async function signUpUser (req,res){
    
    const user ={
        userName:req.body.userName,
        password : req.body.password,
        userType : req.body.userType,
        phone_number : req.body.phone_num,
        address : req.body.address,
        user_id : uuidv4()
    }

    const result = validateUser(user);
    console.log(result)
    if (!result.status) console.log(result.message)
    
    
    const signUpQuery1 = "INSERT  INTO user (userName,password,user_type,user_id) VALUES (?,?,?,?)"
    const signUpQuery2 = "INSERT  INTO customer (phone_number,address,user_id) VALUES (?,?,?)"


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
    console.log("Data Inserted");
    }).
    on('rollback', function(err){
        console.log("Data Insertion Failed");
    });

    chain.
    query(signUpQuery1,[user.userName,user.password,user.userType,user.user_id]).
    query(signUpQuery2,[user.phone_number,user.address,user.user_id]);
    
}

module.exports = {signUpUser}

