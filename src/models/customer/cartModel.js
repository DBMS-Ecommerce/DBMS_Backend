const db = require('../../config/database');

async function addToCart(req,res){
    const cus_id = req.body.id;
    const quantity = req.body.quantity;
    const sku = req.body.sku;
    const price = req.body.price;

    

    stmt = "INSERT INTO `cart` (`customer_id`, `sku`, `quantity`, `price`) VALUES (?,?,?,?)"

    db.query(stmt,[cus_id,sku,quantity,price],function (err, result, fields) {
        if (err){
        console.log(err);
        return res.status(400).send("Insertion Falid")
        }else{
            return res.status(200).send("Data Inserted");
        }            
                    
               
            })

}

module.exports = {addToCart}