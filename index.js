var transaction = require("node-mysql-transaction");
const Item = require("./src/models/Item");
const Order = require("./src/models/Order");
const Product_Filter = require("./src/models/Product_Filter");
const Item_Filter = require("./src/models/ItemFilter");
const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const path = require("path");
require("dotenv").config();
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello nj");
});

const cus_signup_Router = require("./src/routes/customer/signupRouter");
const cus_login_Router = require("./src/routes/customer/loginRouter");
const category_Router = require("./src/routes/customer/categoryRouter");
const user_Router = require("./src/routes/customer/userRouter");

// use the modules
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// starting the server
// require("dotenv").config();
var db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
  });

  db.connect((err) => {
    if (err) {
      console.log("error when connecting to db: ", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  app.use("/signup", cus_signup_Router);
  app.use("/login", cus_login_Router);
  app.use("/category", category_Router);
  app.use("/user", user_Router);

  db.on("error", (err) => {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();
app.get("/test", (req, res) => {
  res.send("Hello World");
});
app.post("/addCategory", async (req, res) => {
  const cat_id = uuidv4();
  // const { category_title, sub_category_title } = req.body;
  // if (sub_category_title == null) {
  //     sub_category_title = category_title;
  // }
  const sql_category = "INSERT INTO category (category_id,title) VALUES (?,?)";
  db.query(sql_category, [cat_id, req.body.category_title], (err, result) => {
    if (err) {
      console.log(err);
      console.log("ERROR WHEN ADDING A Category: " + err);
    } else {
      console.log("Category Inserted");
      res.json({
        success: "ok",
      });
    }
  });
});
app.post("/addSubCategory", async (req, res) => {
  const s_cat_id = uuidv4();
  const sql_sub_category =
    "INSERT INTO sub_category (sub_category_id,category_id,title) VALUES (?,?,?)";
  const cat_id = await cat_ID_finder(req.body.cat_title);
  db.query(
    sql_sub_category,
    [s_cat_id, cat_id, req.body.sub_category_title],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("ERROR WHEN ADDING A Category: " + err);
      } else {
        res.json({
          success: "ok",
        });
        console.log("Sub Category Inserted");
      }
    }
  );
});
app.post("/addProduct", async (req, res) => {
  const pro_id = uuidv4();
  const sub_cat_id = await sub_cat_ID_finder(req.body.s_cat_id);
  console.log(sub_cat_id);
  const sql_product =
    "INSERT INTO product (product_id,sub_category_id, title) VALUES (?,?,?)";
  db.query(sql_product, [pro_id, sub_cat_id, req.body.title], (err, result) => {
    if (err) {
      console.log(err);
      console.log("ERROR WHEN ADDING A Product: " + err);
    } else {
      console.log("Product Inserted");
      res.json({
        success: "ok",
      });
    }
  });
});

function sub_cat_ID_finder(s_category_title) {
  return new Promise((resolve, reject) => {
    const s_c_sql = "SELECT sub_category_id from sub_category where title=?";
    db.query(s_c_sql, s_category_title, (err, result) => {
      if (err) {
        return reject(err);
      }
      let temp = JSON.parse(JSON.stringify(result));
      if (temp.length > 0) resolve(temp[0].sub_category_id);
    });
  });
}

function pro_ID_finder(product_title) {
  return new Promise((resolve, reject) => {
    const pro_sql = "SELECT product_id from product where title=?";
    db.query(pro_sql, product_title, (err, result) => {
      if (err) {
        return reject(err);
      }
      let temp = JSON.parse(JSON.stringify(result));
      if (temp.length > 0) resolve(temp[0].product_id);
    });
  });
}

function cat_ID_finder(category_title) {
  return new Promise((resolve, reject) => {
    const c_sql = "SELECT category_id from category where title=?";
    db.query(c_sql, category_title, (err, result) => {
      if (err) {
        return reject(err);
      }
      let temp = JSON.parse(JSON.stringify(result));
      if (temp.length > 0) resolve(temp[0].category_id);
    });
  });
}

app.post("/add_item", async (req, res) => {
  const variant_array = req.body.variant_array;
  const pro_id = await pro_ID_finder(req.body.title);
  const sku = uuidv4();

  console.log(variant_array);
  const item_variant = "Insert Into item_variant (sku,variant_id) Values (?,?)";
  const sql_variant =
    "INSERT INTO variant (variant_id,product_id,title,var_price,var_type) VALUES (?,?,?,?,?)";
  var trCon = transaction({
    connection: [
      mysql.createConnection,
      {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
      },
    ],
    dynamicConnection: 32,
    idleConnectionCutoffTime: 1000,
    timeout: 600,
  });
  let chain = trCon.chain();

  chain
    .on("commit", async function () {
      try {
        let item = new Item(sku);
        await item.InitiateItemProperties(
          pro_id,
          unit_price,
          0 + ".jpg",
          0,
          0,
          item_title
        );
        var_id_array.forEach(async (element, index) => {
          db.query(item_variant, [sku, element]);
        });
      } catch (err) {
        console.log("ERROR WHEN CREATING A Item: " + err);
        res.json({
          success: false,
          err,
        });
      }
      res.json({
        success: "ok",
      });
      console.log("Data Inserted");
    })
    .on("rollback", function (err) {
      console.log(err);
      console.log("Data Insertion Failed");
    });

  var unit_price = 0;
  var item_title = req.body.title;
  // variant_array.forEach(variant => {
  //     for (let key in variant) {
  //         chain.query(sql_variant, [pro_id, variant[key]])
  //     }
  // })
  let var_id_array = [];
  variant_array.forEach(async (element, index) => {
    console.log(element.title);
    const variant_id = uuidv4();
    var_id_array.push(variant_id);
    chain.query(sql_variant, [
      variant_id,
      pro_id,
      element.title,
      element.var_price,
      element.var_type,
    ]);

    unit_price += element.var_price;
    item_title = item_title + " " + element.title;
  });
});

app.post("/ModifyItem", async (req, res) => {
  const updated_item_array = req.body.updated_item_array;
  console.log(req.body);
  // const { quantity, is_default, image } = req.body;
  updated_item_array.forEach(async (element, index) => {
    let item = new Item(element.sku);
    try {
      let update_result = await item.updateItemProperties(
        element.quantity,
        element.is_default,
        element.image
      );
      res.json({ success: true, u_result: update_result });
    } catch (error) {
      console.log("ERROR WHEN Modifying A Item: " + err);
    }
  });
});
app.put("/confirm_order/:order_id", async (req, res) => {
  let order = new Order(req.params.order_id);
  console.log(req.params.order_id);
  console.log(order);
  var trCon = transaction({
    connection: [
      mysql.createConnection,
      {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
      },
    ],
    dynamicConnection: 32,
    idleConnectionCutoffTime: 1000,
    timeout: 600,
  });
  let chain = trCon.chain();
  chain
    .on("commit", function () {
      console.log("All Completed");
    })
    .on("rollback", function (err) {
      console.log("Failed");
    });
  let order_data = await order.GettingOrderDetails();
  var o_confirmation_result = await order.confirmOrder(order_data);
  console.log(await order.confirmOrder(order_data));
  console.log("dibaaa");
  console.log(o_confirmation_result);
  if (o_confirmation_result) {
    chain
      .query("UPDATE cus_order SET order_status=? WHERE order_id=?", [
        "CONFIRMED",
        req.params.order_id,
      ])
      .on("result", async function (result) {
        await order.SettingOrder_ItemDetails(order_data);
      });

    res.json({
      success: true,
    });
  } else {
    chain.query("UPDATE cus_order SET order_status=? WHERE order_id=?", [
      "CANCELLED",
      req.params.order_id,
    ]);
    console.log("Order Cancelled");
    res.json({
      success: false,
    });
  }
});
app.get("/view_Add_variant", async (req, res, next) => {
  try {
    let categories = await Product_Filter.getAllCategories();
    res.json({ success: true, categories });
  } catch (error) {
    next(error);
  }
});
app.get("/viewCategories", async (req, res, next) => {
  try {
    let categories = await Product_Filter.getAllCate();
    res.json({ success: true, categories });
  } catch (error) {
    next(error);
  }
});
app.get("/sub_categoryShow/:category_id", async (req, res, next) => {
  var category_id = req.params.category_id;
  try {
    var sub_categories = await Product_Filter.getAllSubCategories(category_id);
    res.json({ success: true, sub_categories });
  } catch (error) {
    next(error);
  }
});
app.get("/sub_categoryShowWithId/:category_id", async (req, res, next) => {
  var category_id = req.params.category_id;
  try {
    var sub_categories = await Product_Filter.getAllSubCategoriesWithId(
      category_id
    );
    res.json({ success: true, sub_categories });
  } catch (error) {
    next(error);
  }
});
app.get("/products/:sub_category_id", async (req, res, next) => {
  var sub_category_id = req.params.sub_category_id;
  try {
    var products = await Product_Filter.getAllProductsBySubCat(sub_category_id);
    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
});

app.get("/product_show", async (req, res, next) => {
  //variant adding scenario
  // let dataObject = { whereObject: {} };
  // if(req.query.producttitle){
  //     dataObject.like = {
  //         search : req.query.producttitle,
  //         searchBy: 'title'
  //     }
  // }

  if (req.body.category) {
    // dataObject.whereObject.category = req.query.category;
    var cat_id = await cat_ID_finder(req.body.category);
    try {
      var sub_categories = await Product_Filter.getAllSubCategories(cat_id);
    } catch (error) {
      next(error);
    }
  }
  if (req.query.sub_category) {
    var s_cat_id = await sub_cat_ID_finder(req.query.sub_category);
    try {
      var products = await Product_Filter.getAll_Products(s_cat_id);
    } catch (error) {
      next(error);
    }
  }
  try {
    // let categories = await Product_Filter.getAllCategories();
    // // let sub_categories = await Product_Filter.getAllSubCategories(cat_id);
    // let products = await Product_Filter.getAllProducts(dataObject);
    res.json({ success: true, categories, sub_categories });
  } catch (err) {
    next(err);
  }
});
app.get("/item_show", async (req, res, next) => {
  let dataObject = { whereObject: {} };
  if (req.query.title) {
    dataObject.like = {
      search: req.query.title,
      searchBy: "title",
    };
  }
  if (req.query.category) {
    dataObject.whereObject.category = req.query.category;
    var cat_id = await cat_ID_finder(req.query.category);
  }
  if (req.query.sub_category) {
    dataObject.whereObject.category = req.query.sub_category;
    var s_cat_id = await sub_cat_ID_finder(req.query.sub_category);
  }
  if (req.query.product) {
    dataObject.whereObject.product = req.query.product;
    var pro_id = await pro_ID_finder(req.query.product);
  }
  try {
    var items = await Product_Filter.getAllItems(dataObject);
    var categories = await Product_Filter.getAllCategories();
    var sub_categories = await Product_Filter.getAllSubCategories(cat_id);
    var products = await Product_Filter.getAll_Products(s_cat_id);
    res.json({ success: true, items, categories, sub_categories, products });
  } catch (err) {
    next(err);
  }
});
app.get("/item_showing/:product_id", async(req, res, next) => {
    var product_id = req.params.product_id;
    try {
        var items = await Product_Filter.getAllitems(product_id);
        res.json({ success: true, items });
    } catch (error) {
        next(error);
    }
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started, listening port: ${port}`));
