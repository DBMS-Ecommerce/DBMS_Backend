require('dotenv').config();

const config ={
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    db : process.env.DB_DATABASE,
    
}
module.exports = config;