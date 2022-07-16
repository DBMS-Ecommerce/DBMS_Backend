const { resolve } = require("path");
const path = require("path");
const Item = require("./Item");
const db = require(path.resolve(__dirname, "database", "connection"));
// const Item = require(path.resolve(__dirname, "Booking"))

class Order {
    constructor(order_id) {
        this.order_id = order_id;
    }
    GettingOrderDetails() {
        return new Promise(async(resolve, reject) => {
            console.log(this.order_id);
            db.query(
                "SELECT * FROM order_item WHERE order_id=?", [this.order_id],
                (err, orderDetails) => {
                    if (err) return reject(err);
                    orderDetails = JSON.parse(JSON.stringify(orderDetails));
                    if (orderDetails.length > 0) {
                        console.log(orderDetails);
                        resolve(orderDetails);
                    }
                }
            );
        });
    }
    SettingOrder_ItemDetails(orderDetails) {
        return new Promise(async(resolve, reject) => {
            orderDetails.forEach(async(order) => {
                let item = new Item(order.item_id);
                try {
                    await item.quantity_Setter(order.quantity);
                    resolve(true);
                } catch (error) {
                    return reject(error);
                }
            });
        });
    }
    confirmOrder(orderDetails) {
        return new Promise(async(resolve, reject) => {
            orderDetails.forEach(async(order, index) => {
                let item = new Item(order.item_id);
                console.log(item);
                try {
                    console.log(!(await item.isAvailable(order.quantity)));
                    if (!(await item.isAvailable(order.quantity))) {
                        console.log("heeloo");
                        console.log(order.quantity);
                        return resolve(false);
                    }
                } catch (error) {
                    return reject(error);
                }
                console.log("hihuu");
                return resolve(true);
            });
        });
    }
}
module.exports = Order;