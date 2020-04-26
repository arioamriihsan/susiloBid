const mysql = require('mysql')
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'b1454cw',
    database : 'susilobid',
    port : 3306
});

module.exports = db