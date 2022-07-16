const db = require('../../config/database');

async function addToCart(req,res){
    const cus_id = req.body.id;
    const quantity = req.body.quantity;
    const sku = req.body.sku;
    const price = req.body.price;
    console.log(req.body.sku);

    

    stmt = "INSERT INTO cart (customer_id, sku, quantity, price) VALUES (?,?,?,?)"

    db.query(stmt,[cus_id,sku,quantity,price],function (err, result, fields) {
        if (err){
        console.log(err);
        return res.status(404).send("Insertion Falid")
        }else{
            return res.status(200).send("Data Inserted");
        }            
                    
               
            })

}
async function getCartByUserId(id){
    stmt = "select * from cart where customer_id = ?";

    return new Promise((resolve,reject)=>{
        db.query(stmt,[id],function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length == 0) {
                    console.log("No product available");
                    reject(new Error("No product"));
                } else {
                  resolve(result)
                    

                }
            })

    })

}
module.exports = {addToCart,getCartByUserId}