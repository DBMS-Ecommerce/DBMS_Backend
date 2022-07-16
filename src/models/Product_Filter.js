const { rejects } = require("assert");
const { resolve } = require("path");
const path = require("path");
const db = require(path.resolve(__dirname, "database", "connection"));
const dbHelper = require(path.resolve(__dirname, "database", "helper"));

class Product_Filter {
    static getAllItems(dataObject) {
        let sql = "SELECT * from item";
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
        if (dataObject && "like" in dataObject && dataObject.like) {
            if (where == 0) sql = sql + " WHERE ";
            else sql = sql + " AND ";
            sql =
                sql + dataObject.like.searchBy + ` LIKE '%${dataObject.like.search}%' `;
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
    static getAll_Products(sub_cat_id) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT DISTINCT title FROM product Where sub_category_id=?", [sub_cat_id],
                (err, results) => {
                    if (err) return reject(err);
                    let products = [];
                    JSON.parse(JSON.stringify(results)).forEach((element) => {
                        products.push(element.title);
                    });
                    resolve(products);
                }
            );
        });
    }
    static getAllCategories() {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT DISTINCT title,category_id FROM category",
                (err, results) => {
                    if (err) return reject(err);
                    let categories = [];
                    JSON.parse(JSON.stringify(results)).forEach((element) => {
                        categories.push(element);
                    });
                    resolve(categories);
                }
            );
        });
    }
    static getAllCate() {
        return new Promise((resolve, reject) => {
            db.query("SELECT DISTINCT title FROM category", (err, results) => {
                if (err) return reject(err);
                let categories = [];
                JSON.parse(JSON.stringify(results)).forEach((element) => {
                    categories.push(element);
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
    static getAllSubCategoriesWithId(cat_id) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT DISTINCT title,sub_category_id as id FROM sub_category Where category_id=?", [cat_id],
                (err, results) => {
                    if (err) return reject(err);
                    let sub_categories = [];
                    JSON.parse(JSON.stringify(results)).forEach((element) => {
                        sub_categories.push({ title: element.title, id: element.id });
                    });
                    resolve(sub_categories);
                }
            );
        });
    }
    static getAllProductsBySubCat(sub_cat_id) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT DISTINCT title,product_id FROM product Where sub_category_id=?", [sub_cat_id],
                (err, results) => {
                    if (err) return reject(err);
                    let products = [];
                    JSON.parse(JSON.stringify(results)).forEach((element) => {
                        products.push({ title: element.title, id: element.product_id });
                    });
                    resolve(products);
                }
            );
        });
    }
    static getAllItemByProduct(product_id) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM item Where product_id=?", [product_id],
                (err, results) => {
                    if (err) return reject(err);
                    var items = [];
                    JSON.parse(JSON.stringify(results)).forEach((element) => {
                        items.push({ title: element.title, id: element.product_id });
                    });
                    resolve(items);
                }
            );
        });
    }
}
module.exports = Product_Filter;