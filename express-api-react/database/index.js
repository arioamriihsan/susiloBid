const mysql = require('mysql')
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'b1454cw',
    database : 'todo_app',
    port : 3306
});

module.exports = db