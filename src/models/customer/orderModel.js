const db = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

async function getAllProducts(req,res){
    const cus_id = res.body.id;
    const type = res.body.id;
    const date = res.body.date;
    const tot_amount = res.body.amount;
    const order_status = res.body.status;
    const address = res.body.address;
    const mob_num = res.body.mob_num;
    const item = res.body.item;
    const quantity = res.body.quantity;
    const order_id = uuidv4();

    const stmt1 = "INSERT INTO order_item (order_id,item_id,quantity) VALUES (?,?,?)"
    const stmt2 = "INSERT INTO cus_order (order_id,customer_id,type,date,total_amount,order_status)"

    item.forEach(element => {
        
    });
}