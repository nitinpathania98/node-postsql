const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "Nitin21",
    host: "localhost",
    port: 5432,
    database: "demo"
});

module.exports = pool;