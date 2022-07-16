const orderModel = require('../../models/customer/orderModel');

async function getOrdersByCustomer(req,res){
    
 orderModel.getOrdersByCustomer(req.params.id).then((result)=>{
        res.send(result);
        return;
    }).catch(e=>{
        console.log(e)
        res.status(404);
        res.send()
    });
   
}

async function getOrderItemsByOrderId(req,res){
    
       
    orderModel.getOrderItemsByOrderId(req.params.id).then((result)=>{
        res.send(result);
        return;
    }).catch(e=>{
        console.log(e)
        res.status(404);
        res.send()
    });
}


async function orderMethod(req,res){

    const result = await orderModel.orderProducts(req,res);
if(result){
    res.send("ok")
}else{
    res.status(400).send("failed")
}
}

module.exports = {getOrdersByCustomer,getOrderItemsByOrderId,orderMethod};
