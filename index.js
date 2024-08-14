const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./src/queries');
const displayBanner = require('./src/displayBanner');

displayBanner();

const startPrompt = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ],
    }
  ]);

  switch (answers.action) {
    case 'View all departments':
      const departments = await viewAllDepartments();
      console.table(departments);
      break;
    case 'View all roles':
      const roles = await viewAllRoles();
      console.table(roles);
      break;
    case 'View all employees':
      const employees = await viewAllEmployees();
      console.table(employees);
      break;
    case 'Add a department':
      const { departmentName } = await inquirer.prompt([
        { type: 'input', name: 'departmentName', message: 'Enter the department name:' }
      ]);
      await addDepartment(departmentName);
      console.log('Department added.');
      break;
    case 'Add a role':
      const { roleTitle, roleSalary, departmentId } = await inquirer.prompt([
        { type: 'input', name: 'roleTitle', message: 'Enter the role title:' },
        { type: 'input', name: 'roleSalary', message: 'Enter the role salary:' },
        { type: 'input', name: 'departmentId', message: 'Enter the department ID for this role:' }
      ]);
      await addRole(roleTitle, roleSalary, departmentId);
      console.log('Role added.');
      break;
    case 'Add an employee':
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'Enter the employee’s first name:' },
        { type: 'input', name: 'lastName', message: 'Enter the employee’s last name:' },
        { type: 'input', name: 'roleId', message: 'Enter the role ID for this employee:' },
        { type: 'input', name: 'managerId', message: 'Enter the manager ID for this employee (leave blank if none):' }
      ]);
      await addEmployee(firstName, lastName, roleId, managerId || null);
      console.log('Employee added.');
      break;
    case 'Update an employee role':
      const { employeeId, newRoleId } = await inquirer.prompt([
        { type: 'input', name: 'employeeId', message: 'Enter the ID of the employee to update:' },
        { type: 'input', name: 'newRoleId', message: 'Enter the new role ID for this employee:' }
      ]);
      await updateEmployeeRole(employeeId, newRoleId);
      console.log('Employee role updated.');
      break;
    case 'Exit':
      console.log('Exiting...');
      process.exit();
      break;
    default:
      console.log('Invalid action.');
  }

  startPrompt();
};

startPrompt();