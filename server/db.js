const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "postgresql",
    port: 5432,
    database: "welbex",
})

module.exports = pool
