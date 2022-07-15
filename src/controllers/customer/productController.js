const productModel = require('../../models/customer/productModel');

async function getProductMethod(req,res){
    
    const result = await productModel.getAllProducts(req,res);
    res.send(result);
    return;
}

async function getProductVariantMethod(req,res){
    
    const result = await productModel.getProductsVar(req,res);
    res.send(result);
    return;
}

module.exports = {getProductMethod,
    getProductVariantMethod}