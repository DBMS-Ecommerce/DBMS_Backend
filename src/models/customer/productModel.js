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
async function getProductVarsById(id){
    const q = `select * from variant where product_id = ?;`
    return new Promise((resolve,reject)=>{
        db.query(q,[id],function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length == 0) {
                    console.log("No product available");
                    reject(new Error("No product"));
                } else {
                   
                    newRes = []
                    result.forEach((v)=>{
                       
                        for(var i=0;i<newRes.length;i++){
                            if(newRes[i].var_type==v.var_type){
                                newRes[i].variants.push({
                                    variant_id:v.variant_id,
                                    title:v.title,
                                    var_price:v.var_price,
                                })
                                return 
                            }
                        }

                        newRes.push({
                            var_type:v.var_type,
                            variants:[{
                                variant_id:v.variant_id,
                                title:v.title,
                                var_price:v.var_price,
                            }]
                        })
                    })
                    resolve(newRes);

                }
            })

    })

}

async function getAllProductsBySubCat(subCatId){
    const q = `select * from item_view where sub_category_id = ? and is_default= 1;`
    return new Promise((resolve,reject)=>{
        db.query(q,[subCatId],function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length == 0) {
                    console.log("No product available");
                    reject(new Error("No product"));
                } else {
                   
                    var newRes = []
                    result.forEach((item)=>{
                        for(var i =0;i<newRes.length;i++){
                            if(newRes[i].product_id==item.product_id){
                                newRes[i].defaultVariants.push({variant_id:item.variant_id,
                                    var_type:item.var_type,
                                    var_title:item.var_title})
                                return 
                            }
                        }
                        newRes.push({
                            product_id:item.product_id,
                            product_title:item.product_title,
                            sub_category_id:item.sub_category_id,
                            unit_price:item.unit_price,
                            quantity:item.quantity,
                            image:item.image,
                            defaultVariants:[{variant_id:item.variant_id,var_type:item.var_type,var_title:item.var_title}]

                        })
                    })
            
                    resolve(newRes);

                }
            })

    })

}

async function getDefaultProductVarById(id){
    const q = `select * from default_item where product_id = ? and is_default = 1;`
    return new Promise((resolve,reject)=>{
        db.query(q,[id],function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length == 0) {
                    console.log("No product available");
                    reject(new Error("No product"));
                } else {
                    console.log(result)
                    newRes ={
                        product_id:result[0].product_id,
                        unit_price:result[0].unit_price,
                        quantity:result[0].quantity,
                        image:result[0].image,
                        variants:result.map(v=>{
                            return {
                                variant_id:v.variant_id,
                                title:v.title,
                                var_price:v.var_price,
                                var_type:v.var_type
                            }
                        })

                    }
                    resolve(newRes);

                }
            })

    })
}


async function getAllProductsBySubCat(subCatId){
    const q = `select * from item_view where sub_category_id = ? and is_default= 1;`
    return new Promise((resolve,reject)=>{
        db.query(q,[subCatId],function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length == 0) {
                    console.log("No product available");
                    reject(new Error("No product"));
                } else {
                   
                    var newRes = []
                    result.forEach((item)=>{
                        for(var i =0;i<newRes.length;i++){
                            if(newRes[i].product_id==item.product_id){
                                newRes[i].defaultVariants.push({variant_id:item.variant_id,
                                    var_type:item.var_type,
                                    var_title:item.var_title})
                                return 
                            }
                        }
                        newRes.push({
                            product_id:item.product_id,
                            product_title:item.product_title,
                            sub_category_id:item.sub_category_id,
                            unit_price:item.unit_price,
                            quantity:item.quantity,
                            image:item.image,
                            defaultVariants:[{variant_id:item.variant_id,var_type:item.var_type,var_title:item.var_title}]

                        })
                    })
            
                    resolve(newRes);

                }
            })

    })

}


async function getPriceByVariants(variants){
    console.log(variants);
    var q = "select * from item_variant where ";
    for(var i=0;i<variants.length;i++){
        if(i==variants.length-1){
            q += "variant_id = ? "
        }else{
            q += "variant_id = ? or "
        }
    }
    return new Promise((resolve,reject)=>{
        db.query(q,variants,function (err, result, fields) {
                if (err)
                    throw err;
                if (result.length == 0) {
                    console.log("No product available");
                    reject(new Error("No product"));
                } else {
                    
                    skus = [];
                    counts = []
                    result.forEach(e=>{
                        if(skus.indexOf(e.sku)==-1){
                            skus.push(e.sku)
                            counts.push(1);
                        }else{
                            counts[skus.indexOf(e.sku)] +=1
                        }
                    })
                    const sku = skus[counts.indexOf(Math.max(...counts))]
                    var q = "select * from item where sku = ?";
                    db.query(q,[sku],function (err, result, fields) {
                        resolve(result[0]);
                    })
                    

                }
            })

    })
}


module.exports = {getAllProducts,getProductVarsById,getDefaultProductVarById,getAllProductsBySubCat,getPriceByVariants}