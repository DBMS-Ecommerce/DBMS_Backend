const dbConfig = require('./config');
const mysql = require("mysql");


// const connection = mysql.createPool({
//     host: dbConfig.host,
//     user: dbConfig.user,
//     password: dbConfig.password,
//     database: dbConfig.db,
//     options: {
//         trustServerCertificate: true
//     }
//   });

  var connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.db
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
  });
  
  module.exports = connection;

