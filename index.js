const express = require('express'),
app = express(), 
cors = require('cors'),
bodyParser = require('body-parser');
const signupRouter = require('./src/routes/signupRouter')


app.get('/',(req,res) =>{
    res.send("Hello nj");
  })

// use the modules
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/signup',signupRouter);


// starting the server
const port =  process.env.PORT || 5000;
app.listen( port , () => console.log(`Server started, listening port: ${port}`));








