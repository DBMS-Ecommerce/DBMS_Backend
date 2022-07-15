const productModel = require('../../models/customer/productModel');

async function getDefaultProductVarById(req,res){
    
    const result = await productModel.getDefaultProductVarById(req.params.id);
    res.send(result);
}
async function getAllProductsBySubCat(req,res){
    
    const result = await productModel.getAllProductsBySubCat(req.params.id);
    res.send(result);
}

async function getProductVarsById(req,res){
    
    const result = await productModel.getProductVarsById(req.params.id);
    res.send(result);
}
async function getPriceByVariants(req,res){
    
    const result = await productModel.getPriceByVariants(req.body);
    res.send(result);
}




module.exports = {getDefaultProductVarById,getProductVarsById,getAllProductsBySubCat,getPriceByVariants};