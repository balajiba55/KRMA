var mysql = require('mysql'),
    connection = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'krma_music',
        port:3306
    });
module.exports = connection;
