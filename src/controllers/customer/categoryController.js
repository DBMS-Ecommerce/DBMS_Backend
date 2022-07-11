const {categoryModel} = require('../../models');

async function getAllCatMethod(req,res){
    
    const result =await  categoryModel.getAllCategory(req,res);
    console.log("ll");
    console.log(result);
    return res.send(result);
}

module.exports=getAllCatMethod