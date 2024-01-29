const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'phd_sms_app',
    port: 3307,
    password: '123456',
    database: 'phd_sms'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Database connected...');
});

module.exports = db;