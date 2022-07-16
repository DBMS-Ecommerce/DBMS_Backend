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

module.exports = {getOrdersByCustomer,getOrderItemsByOrderId};
