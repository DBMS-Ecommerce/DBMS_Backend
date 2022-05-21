const express = require('express'),
app = express(), 
cors = require('cors'),
bodyParser = require('body-parser');


app.get('/',(req,res) =>{
    res.send("Hello World");
  })

// use the modules
app.use(cors())
app.use(bodyParser.json());





// starting the server
const port =  process.env.PORT || 5000;
app.listen( port , () => console.log(`Server started, listening port: ${port}`));








