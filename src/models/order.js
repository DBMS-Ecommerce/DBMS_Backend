const { resolve } = require('path');
const path = require('path');
const Item = require('./Item');
const db = require(path.resolve(__dirname, "database", "connection"))
    // const Item = require(path.resolve(__dirname, "Booking"))

class Order {
    constructor(order_id) {
        this.order_id = order_id;
    }
    GettingOrderDetails() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM order_item WHERE order_id=?", [this.order_id], (err, orderDetails) => {
                if (err) return reject(err)
                orderDetails = JSON.parse(JSON.stringify(orderDetails))
                if (orderDetails.length > 0) {
                    resolve(orderDetails);
                }
            })
        })
    }
    SettingOrder_ItemDetails(orderDetails) {
        return new Promise((resolve, reject) => {
            orderDetails.forEach(async(order) => {
                let item = new Item(order.item_id);
                try {
                    await item.quantity_Setter(order.quantity);
                    resolve(true);
                } catch (error) {
                    return reject(error);
                }
            })
        })
    }
    confirmOrder(orderDetails) {
        return new Promise((resolve, reject) => {
            orderDetails.forEach(async(order) => {
                    let item = new Item(order.item_id);
                    try {
                        if (!(await item.isAvailable(order.quantity))) {
                            return resolve(false);
                        }
                    } catch (error) {
                        return reject(error);
                    }

                }

            );
            resolve(true);


        })
    }
}
module.exports = Order