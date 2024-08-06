const pool = require('../config/connection');

const getEmployees = () => {
  return pool.query(`
    SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager 
    FROM employee e
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `);
};

const addEmployee = (first_name, last_name, role_id, manager_id) => {
  return pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, role_id, manager_id]);
};

const updateEmployeeRole = (id, role_id) => {
  return pool.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [role_id, id]);
};

module.exports = { getEmployees, addEmployee, updateEmployeeRole };