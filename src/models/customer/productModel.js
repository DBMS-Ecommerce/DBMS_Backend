const db = require('../../config/database');

async function getAllProducts(req,res){
    const sub_cat_id = req.params.id;
    console.log(sub_cat_id);
    const stmt  = "SELECT * FROM item WHERE product_id IN (SELECT `product_id` FROM `product` WHERE `sub_category_id` =? ) AND `is_default` = 1";
    
    return new Promise((resolve,reject)=>{
        db.query(stmt,[sub_cat_id],function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length == 0) {
                    console.log("No product available");
                    reject(new Error("No product"));
                } else {
                    console.log(result)
                    resolve(result);

                }
            })

    })
}

async function getProductsVar(req,res){
    const pro_id = req.params.id;
    const stmt = "SELECT "
}

module.exports = {getAllProducts}