const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser');
const signupRouter = require('./src/routes/signupRouter')


app.get('/', (req, res) => {
    res.send("Hello nj");
})

// use the modules
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/signup', signupRouter);
// starting the server
// require("dotenv").config();
var db;

function handleDisconnect() {
    db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT
    });

    db.connect((err) => {
        if (err) {
            console.log('error when connecting to db: ', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    db.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
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
app.post("/add_category", (req, res) => {
    const { title } = req.body;
    const sql = "INSERT INTO category (title) VALUES (?)";
    db.query(sql, [title], (err, res) => {

        if (err) {
            console.log("Error Category Adding" + err);
            res.json({
                success: false,
                err
            })
        } else {

            res.send("Category Added");
            res.json({
                success: true,
                result
            })
        }
    })

});

// use the modules

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started, listening port: ${port}`));