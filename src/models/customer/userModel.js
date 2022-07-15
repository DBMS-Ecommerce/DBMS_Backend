const db = require('../../config/database');
var transaction = require('node-mysql-transaction');
var mysql = require('mysql');

async function getCustomerById(req,res){
    const cus_id = (req.params.id).toString();
    
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

async function updateCustomer(req,res){
    const u_id  = req.body.id;
    const address = req.body.address;
    const mob_num = req.body.mob_num;
    const name = req.body.name

    const stmt1 = "UPDATE user SET name = ? WHERE  user_id = ? "
    const stmt2 = "UPDATE customer SET phone_number = ?, address = ? WHERE user_id = ?"

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
                        
                        // res.status(200).send("Data Inserted")
                        res.status(200).send("Data Updated")
                        return "Data Updated";
                    }).
                    on('rollback', function(err){
                       return "Data Insertion Failed";
                    });
                
                    chain.
                    query(stmt1,[name,u_id]).
                    query(stmt2,[mob_num,address,u_id]);
                    

                }
            

    


module.exports = {getCustomerById,updateCustomer}