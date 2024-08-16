const inquirer = require('inquirer');
const Table = require('cli-table3');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./src/queries');
const displayBanner = require('./src/displayBanner');

// Function to clear the console
const clearConsole = () => {
  process.stdout.write('\x1Bc'); // ANSI escape code to clear the console
};

const startPrompt = async () => {
  displayBanner(); // Call displayBanner only once at the start
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
          head: ['ID', 'Title', 'Salary', 'Department'],
          colWidths: [5, 30, 15, 30] // Adjust the widths as needed
        });
        roles.forEach(role => {
          roleTable.push([role.id, role.title, parseFloat(role.salary).toFixed(2), role.department]); // Exclude department_id
        });
        console.log(roleTable.toString());
        break;

      case 'View all employees':
        clearConsole(); // Clear the console to hide previous output
        displayBanner(); // Re-display the banner
        const employees = await viewAllEmployees();
        const employeeTable = new Table({
          head: ['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager'],
          colWidths: [6, 15, 15, 30, 20, 10, 20]
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
        await addRole();
        console.log('Role added.');
        break;

      case 'Add an employee':
        const rolesList = await viewAllRoles();
        const employeesList = await viewAllEmployees();

        const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
          { type: 'input', name: 'firstName', message: 'Enter the employee’s first name:' },
          { type: 'input', name: 'lastName', message: 'Enter the employee’s last name:' },
          {
            type: 'list',
            name: 'roleId',
            message: 'Select the role for this employee:',
            choices: rolesList.map(role => ({ name: role.title, value: role.id }))
          },
          {
            type: 'list',
            name: 'managerId',
            message: 'Select the manager for this employee (select None if there is no manager):',
            choices: [
              { name: 'None', value: null },
              ...employeesList.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
              }))
            ]
          }
        ]);

        await addEmployee(firstName, lastName, roleId, managerId);
        console.log('Employee added.');
        break;

      case 'Update an employee role':
        const employeesForUpdate = await viewAllEmployees();
        const rolesForUpdate = await viewAllRoles();

        const { employeeIdForUpdate, newRoleIdForUpdate } = await inquirer.prompt([
          {
            type: 'list',
            name: 'employeeIdForUpdate',
            message: 'Select the employee whose role you want to update:',
            choices: employeesForUpdate.map(employee => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id
            }))
          },
          {
            type: 'list',
            name: 'newRoleIdForUpdate',
            message: 'Select the new role for this employee:',
            choices: rolesForUpdate.map(role => ({
              name: role.title,
              value: role.id
            }))
          }
        ]);

        await updateEmployeeRole(employeeIdForUpdate, newRoleIdForUpdate);
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