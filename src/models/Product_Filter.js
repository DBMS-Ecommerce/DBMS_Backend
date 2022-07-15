const { rejects } = require("assert");
const { resolve } = require("path");
const path = require("path");
const db = require(path.resolve(__dirname, "database", "connection"));
const dbHelper = require(path.resolve(__dirname, "database", "helper"));

class Product_Filter {
    static getAllProducts(dataObject) {
        let sql = "SELECT * from product";
        let where = 0;
        if (
            dataObject &&
            "whereObject" in dataObject &&
            Object.entries(dataObject.whereObject).length > 0
        ) {
            sql =
                sql +
                " WHERE " +
                dbHelper.equalSequenceString(Object.keys(dataObject.whereObject));
            where = 1;
        }
        let values = null;
        if (where) values = Object.values(dataObject.whereObject);
        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, results) => {
                if (err) return reject(err);
                resolve(JSON.parse(JSON.stringify(results)));
            });
        });
    }
    static getAllCategories() {
        return new Promise((resolve, reject) => {
            db.query("SELECT DISTINCT title FROM category", (err, results) => {
                if (err) return reject(err);
                let categories = [];
                JSON.parse(JSON.stringify(results)).forEach((element) => {
                    categories.push(element.title);
                });
                resolve(categories);
            });
        });
    }
    static getAllSubCategories(cat_id) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT DISTINCT title FROM sub_category Where category_id=?", [cat_id],
                (err, results) => {
                    if (err) return reject(err);
                    let sub_categories = [];
                    JSON.parse(JSON.stringify(results)).forEach((element) => {
                        sub_categories.push(element.title);
                    });
                    resolve(sub_categories);
                }
            );
        });
    }
}
module.exports = Product_Filter;