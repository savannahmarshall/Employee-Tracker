const inquirer = require('inquirer');
const Table = require('cli-table3');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./src/queries');
const displayBanner = require('./src/displayBanner');

displayBanner();

const startPrompt = async () => {
  let continueApp = true;

  while (continueApp) {
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
        const departmentTable = new Table({
          head: ['ID', 'Name'],
          colWidths: [6, 20]
        });
        departments.forEach(department => {
          departmentTable.push([department.id, department.name]);
        });
        console.log(departmentTable.toString());
        break;
 
      case 'View all roles':
        const roles = await viewAllRoles();
        const roleTable = new Table({
          head: ['ID', 'Title', 'Salary', 'Department ID'],
          colWidths: [5, 30, 15, 15]
        });
        roles.forEach(role => {
          roleTable.push([role.id, role.title, parseFloat(role.salary).toFixed(2), role.department_id]);
        });
        console.log(roleTable.toString());
        break;
     
      case 'View all employees':
        const employees = await viewAllEmployees();
        const employeeTable = new Table({
          head: ['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager'],
          colWidths: [6, 15, 15, 30, 15, 10, 20]
        });
        employees.forEach(employee => {
          employeeTable.push([
            employee.id,
            employee.first_name,
            employee.last_name,
            employee.role,
            employee.department,
            employee.salary ? parseFloat(employee.salary).toFixed(2) : 'N/A',
            employee.manager || 'N/A'
          ]);
        });
        console.log(employeeTable.toString());
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
          { type: 'input', name: 'managerId', message: 'Enter the manager ID for this employee (leave blank if none):', default: null }
        ]);
     
        // Convert managerId to null if it is blank
        const finalManagerId = managerId === '' ? null : managerId;
     
        await addEmployee(firstName, lastName, roleId, finalManagerId);
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
        continueApp = false;
        break;

      default:
        console.log('Invalid action.');
    }
  }
};

startPrompt();