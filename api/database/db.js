const mysql=require('mysql')

module.exports.conn=mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERDB,
    password: process.env.PWDB,
    database: process.env.DBNAME,

})



