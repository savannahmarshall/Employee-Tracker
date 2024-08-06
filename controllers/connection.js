const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_db',
  password: 'Duckies43!!!',
  port: 3001,
});

module.exports = pool;