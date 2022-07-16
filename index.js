const express = require('express'),
app = express(), 
cors = require('cors'),
bodyParser = require('body-parser');

const cus_signup_Router  = require('./src/routes/customer/signupRouter');
const cus_login_Router = require('./src/routes/customer/loginRouter');
const category_Router = require('./src/routes/customer/categoryRouter');
const user_Router = require('./src/routes/customer/userRouter');
const product_Router = require('./src/routes/customer/productRouter');
const cart_Router = require('./src/routes/customer/cartRouter');
const order_Router = require('./src/routes/customer/orderRouter')


app.get('/',(req,res) =>{
    res.send("Hello nj nuwan");
})

// use the modules
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/signup',cus_signup_Router);
app.use('/login',cus_login_Router);
app.use('/category',category_Router);
app.use('/user',user_Router);
app.use('/products',product_Router)
app.use('/cart',cart_Router)
app.use('/order',order_Router)


// starting the server
const port =  process.env.PORT || 5000;
app.listen( port , () => console.log(`Server started, listening port: ${port}`));








