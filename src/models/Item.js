const { resolve } = require("path");
const path = require("path");

const db = require(path.resolve(__dirname, "database", "connection"));
class Item {
    constructor(sku) {
        this.sku = sku;
    }

    InitiateItemProperties(
        product_id,
        unit_price,
        image,
        is_default,
        quantity,
        title
    ) {
        this.product_id = product_id;
        this.unit_price = unit_price;
        this.image = image;
        this.is_default = is_default;
        this.quantity = quantity;
        this.title = title;
        return new Promise(async(resolve, reject) => {
            db.query(
                "INSERT INTO item (sku,product_id,unit_price,quantity,is_default,image,title) VALUES (?,?,?,?,?,?,?)", [this.sku, product_id, unit_price, quantity, is_default, image, title],
                (err, result) => {
                    if (err) return reject(err);
                    if (result.insertId) return resolve(true);
                    else return resolve(null);
                }
            );
        });
    }

    updateItemProperties(quantity, is_default, image) {
        return new Promise(async(resolve, reject) => {
            db.query(
                "UPDATE item SET quantity=?,is_default=?,image=? WHERE sku=?", [quantity, is_default, image, this.sku],
                async(err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    if (result.changedRows) {
                        resolve(true);
                    }
                }
            );
        });
    }
    quantity_Getter(sku) {
        return new Promise(async(resolve, reject) => {
            db.query(
                "SELECT quantity From item WHERE sku=?", [sku],
                async(item_quantity, error) => {
                    if (err) {
                        return reject(error);
                    }
                    var item_quantity = JSON.parse(JSON.stringify(item_quantity));
                    if (item_quantity.length > 0) resolve(item_quantity[0].quantity);
                }
            );
        });
    }
    quantity_Setter(confirmed_needed_quantity) {
        return new Promise(async(resolve, reject) => {
            const available_quantity = await this.quantity_Getter(this.sku);
            const new_quantity = available_quantity - confirmed_needed_quantity;
            db.query(
                "UPDATE item SET quantity=? WHERE sku=?", [new_quantity, this.sku],
                async(err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    if (result.changedRows) {
                        resolve(true);
                    }
                }
            );
        });
    }
    isAvailable(needed_quantity) {
        return new Promise(async(resolve, reject) => {
            const available_quantity = await this.quantity_Getter(this.sku);
            if (needed_quantity > available_quantity) {
                return resolve(false);
            }
            return resolve(true);
        });
    }
}
module.exports = Item;