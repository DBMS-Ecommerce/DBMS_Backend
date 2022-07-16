const db = require('../../config/database');

async function getOrdersByCustomer(id){
    const stmt  = "select * from cus_order where customer_id = ?";
    
    return new Promise((resolve,reject)=>{
        db.query(stmt,[id],function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length == 0) {
                    console.log("No product available");
                    reject("No product");
                } else {
                    console.log(result)
                    resolve(result);

                }
            })

    })
}

async function getOrderItemsByOrderId(id){
    const stmt  = "SELECT  order_id,item.sku,order_item.quantity,item.product_id,item.title,item.unit_price FROM order_item INNER JOIN item ON order_item.item_id=item.sku WHERE order_id = ? ";
    
    return new Promise((resolve,reject)=>{
        db.query(stmt,[id],function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length == 0) {
                    console.log("No product available");
                    reject(new Error("No product"));
                } else {
                    console.log(result)
                    resolve(result);

                }
            })

    })
}




const { v4: uuidv4 } = require('uuid');
var transaction = require('node-mysql-transaction');
var mysql = require('mysql');
const { date } = require('joi');

async function orderProducts(req,res){
    const cus_id = req.body.id;
    const item = req.body.item;
    const today = new Date();
    console.log(item);
    const stmt1 = "INSERT INTO order_item (order_id,item_id,quantity) VALUES (?,?,?)"
    const stmt2 = "INSERT INTO cus_order (order_id,customer_id,type,date,total_amount,order_status,address,mobile_number) VALUES (?,?,?,?,?,?,?,?)"
  
    
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

    return new Promise((resolve,reject)=>{
        let chain = trCon.chain();
        chain.
        on('commit', function(){
            
            resolve(true)
            
            
        }).
        on('rollback', function(err){
            console.log(err);
            resolve(false)
            // return  res.status(400).send("Data Insertion Failed")
           
        });
        item.forEach(element => {
            const type = element.type;
            const tot_amount = element.totalPrice;
            const order_status = "PENDING";
            const address = element.address;
            const mob_num = element.phoneNumber;
            const order_id = uuidv4();
            const quantity = element.quantity;
            const item_id =     element.item_id
            
    
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
        
      
        
           
        
            chain = chain.query(stmt2,[order_id,cus_id,type,date,tot_amount,order_status,address,mob_num]).query(stmt1,[order_id,item_id,quantity])
            ;
            
            
        });
       

    })

   



    
    // if(flag){
    //     console.log("Success");
    //     return  res.status(200).send("Data Inserted")
    // }else{
    //     return res.status(400).send("Data Insertion Failed")
    // }
  
}


module.exports = {getOrderItemsByOrderId,getOrdersByCustomer,orderProducts}