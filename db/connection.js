const { Pool } = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "rootroot",
    database: "empire_db",
    port: 5432,
});

module.exports = pool;
