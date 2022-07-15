const cartyModel = require('../../models/customer/cartModel');

async function addToCartMethod(req,res){
    
    const result =await  cartyModel.addToCart(req,res);
    return;
    
}

module.exports = {addToCartMethod};