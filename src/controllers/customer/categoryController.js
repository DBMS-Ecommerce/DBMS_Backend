const categoryModel = require('../../models/customer/categoryModel');

async function getAllCatMethod(req,res){
    
    const result =await  categoryModel.getAllCategory(req,res);
    
    console.log(result);
    res.send(result);
    return;
    
}

async function getSubCatMethod(req,res){
    const result = await categoryModel.getAllSubCategory(req,res);
    console.log(result);
    res.send(result);
    return;
}

module.exports = {getAllCatMethod, 
            getSubCatMethod}
                