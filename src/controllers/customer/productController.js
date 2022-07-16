const productModel = require('../../models/customer/productModel');

async function getDefaultProductVarById(req,res){
    
    const result = await productModel.getDefaultProductVarById(req.params.id);
    res.send(result);
    return;
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



async function getProductVariantMethod(req,res){
    
    const result = await productModel.getProductsVar(req,res);
    res.send(result);
    return;
}
async function searchByTitle(req,res){
    
 productModel.searchByTitle(req.body.title).then(result=>{
    res.send(result);
    return;
 })
    
}
module.exports = {getDefaultProductVarById,getProductVarsById,getAllProductsBySubCat,getPriceByVariants,searchByTitle};
