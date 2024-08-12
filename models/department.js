const pool = require('../controllers/connection');  // Updated path

const getDepartments = () => {
  return pool.query('SELECT * FROM department');
};

const addDepartment = (name) => {
  return pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
};

module.exports = { getDepartments, addDepartment };