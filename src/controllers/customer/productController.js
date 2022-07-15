const productModel = require('../../models/customer/productModel');

async function getProductMethod(req,res){
    
    const result = await productModel.getAllProducts(req,res);
    res.send(result);
}

module.exports = getProductMethod;