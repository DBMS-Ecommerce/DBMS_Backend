
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

async function getItemByCategory(req,res){
    const cat_id = req.params.id;

    stmt = "SELECT * FROM item WHERE "
}


async function getAllSubCategory(req,res){
    const cat_id = req.params.id;
    const stmt = "SELECT * FROM category";
}

module.exports = {getAllCategory}