const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost', 
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'notes_db'
});

connection.connect();

module.exports = connection;  