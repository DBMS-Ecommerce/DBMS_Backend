
const db = require('../../config/database');

async function getAllCategory(req,res){
    const stmt = "SELECT * FROM category";

    return new Promise((resolve,reject)=>{
        db.query(stmt,function (err, result, fields) {
                if (err)
                    throw err;

                if (result.length == 0) {
                    console.log("No category available");
                    reject(new Error("No Cat"));
                } else {
                    // res1 = result
                    // console.log(resul);
                    resolve(result);

                }
            })

    })
}

async function getAllSubCategory(req,res){
    const cat_id = req.params.id;
    console.log(cat_id);
    const stmt1 = "SELECT sub_category_id,title FROM sub_category where `category_id` = ? ";
    

    return new Promise((resolve,reject)=>{
        db.query(stmt1,[cat_id],function (err, result, fields) {
                if (err)
                    throw err;

                if (result.length == 0) {
                    console.log("No sub category available");
                    reject(new Error("No Cat"));
                } else {
                    
                    resolve(result);

                }
            })

    })
}



module.exports = {getAllCategory,getAllSubCategory}