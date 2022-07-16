const cartModel = require('../../models/customer/cartModel');

async function addToCartMethod(req,res){
    
    const result =await  cartModel.addToCart(req,res);
    return;
    
}
async function getCartByUserId(req,res){
   cartModel.getCartByUserId(req.params.uid).then(result=>{
    res.send(result)
   }).catch(e=>{
    console.log(e);
    res.status(404).send("failed")
   });
   
}
module.exports = {addToCartMethod,getCartByUserId};