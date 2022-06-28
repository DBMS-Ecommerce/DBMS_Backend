const dbConfig = require('./config');
const mysql = require("mysql");


const connection = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.db,
    options: {
        trustServerCertificate: true
    }
  });
  
  module.exports = connection;

