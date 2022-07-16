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


module.exports = {getOrderItemsByOrderId,getOrdersByCustomer}


