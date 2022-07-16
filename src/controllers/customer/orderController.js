const orderModel = require('../../models/customer/orderModel');

async function orderMethod(req,res){

    const result = await orderModel.orderProducts(req,res);
if(result){
    res.send("ok")
}else{
    res.status(400).send("failed")
}
}

module.exports = orderMethod