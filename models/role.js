const pool = require('../config/connection');

const getRoles = () => {
  return pool.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id');
};

const addRole = (title, salary, department_id) => {
  return pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, department_id]);
};

module.exports = { getRoles, addRole };