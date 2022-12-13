require('dotenv').config({ path: 'variables.env' })
const mysql = require('mysql2')

exports.conectarDB = () => {
    const connection = mysql.createConnection(`mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`)

    return connection
}