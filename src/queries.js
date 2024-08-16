const inquirer = require('inquirer');
const pool = require('./connection');

// Function to view all departments
const viewAllDepartments = async () => {
  const result = await pool.query('SELECT id, name FROM department');
  return result.rows;
};

// Function to view all roles
const viewAllRoles = async () => {
  const result = await pool.query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  return result.rows;
};

// Function to view all employees
const viewAllEmployees = async () => {
  try {
    const query = `
      SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department,
        r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `;

    const { rows } = await pool.query(query);
    // Convert salary to a number if it's not already
    rows.forEach(row => {
      row.salary = parseFloat(row.salary);
    });
    return rows;
  } catch (error) {
    console.error('Error in viewAllEmployees:', error);
    return [];
  }
};

// Function to add a department
const addDepartment = async (name) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

// Function to add a role
const addRole = async () => {
  try {
    // Retrieve all departments
    const departments = await pool.query('SELECT id, name FROM department');

    // Display the list of departments
    if (departments.rows.length === 0) {
      console.log('No departments found. Please add a department first.');
      return;
    }

    // Prompt the user for role details and department selection
    const { title, salary, department_id } = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the role title:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the role salary:',
        validate: value => !isNaN(value) || 'Please enter a valid number for salary.',
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the department for this role:',
        choices: departments.rows.map(dept => ({
          name: dept.name,   
          value: dept.id      
        }))
      }
    ]);

    //Insert the new role into the database
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log('Role added successfully.');

  } catch (err) {
    console.error('Error adding role:', err.message);
  }
};

// Function to add an employee with validation
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
  try {
    // Validate role_id
    const roleCheckQuery = 'SELECT * FROM role WHERE id = $1';
    const roleCheckResult = await pool.query(roleCheckQuery, [role_id]);

    if (roleCheckResult.rows.length === 0) {
      console.log(`Error: Role ID ${role_id} does not exist. Please enter a valid Role ID.`);
      return;
    }

    // Validate manager_id if provided
    if (manager_id) {
      const managerCheckQuery = 'SELECT * FROM employee WHERE id = $1';
      const managerCheckResult = await pool.query(managerCheckQuery, [manager_id]);

      if (managerCheckResult.rows.length === 0) {
        console.log(`Error: Manager ID ${manager_id} does not exist. Please enter a valid Manager ID.`);
        return;
      }
    }

    // If validations pass, insert the employee
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id || null]);
    console.log('Employee added successfully.');

  } catch (err) {
    console.error('Error adding employee:', err.message);
  }
};

// Function to update an employee's role
const updateEmployeeRole = async (employee_id, new_role_id) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [new_role_id, employee_id]);
};

module.exports = { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };