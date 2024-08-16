const inquirer = require('inquirer');
const Table = require('cli-table3');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./src/queries');
const displayBanner = require('./src/displayBanner');

// Function to clear the console using ANSI escape code
const clearConsole = () => {
  process.stdout.write('\x1Bc');
};

// Function to start the main prompt loop
const startPrompt = async () => {
  displayBanner(); // Display the application banner at the start
  let continueApp = true; // Variable to control the loop

  // Main loop that continues until the user chooses to exit
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

    // Handle user selections based on their choice
    switch (answers.action) {
      case 'View all departments':
        const departments = await viewAllDepartments(); // Fetch all departments from the database
        const departmentTable = new Table({
          head: ['ID', 'Name'],
          colWidths: [6, 20] // Define column widths
        });
        departments.forEach(department => {
          departmentTable.push([department.id, department.name]); // Add department data to the table
        });
        console.log(departmentTable.toString()); // Display the table in the console
        break;

      case 'View all roles':
        const roles = await viewAllRoles(); // Fetch all roles from the database
        const roleTable = new Table({
          head: ['ID', 'Title', 'Salary', 'Department'],
          colWidths: [5, 30, 15, 30] // Define column widths
        });
        roles.forEach(role => {
          roleTable.push([role.id, role.title, parseFloat(role.salary).toFixed(2), role.department]); // Add role data to the table
        });
        console.log(roleTable.toString()); // Display the table in the console
        break;

      case 'View all employees':
        clearConsole(); // Clear the console before displaying data
        displayBanner(); // Display the banner again after clearing
        const employees = await viewAllEmployees(); // Fetch all employees from the database
        const employeeTable = new Table({
          head: ['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager'],
          colWidths: [6, 15, 15, 30, 20, 10, 20] // Define column widths
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
          ]); // Add employee data to the table
        });
        console.log(employeeTable.toString()); // Display the table in the console
        break;

      case 'Add a department':
        const { departmentName } = await inquirer.prompt([
          { type: 'input', name: 'departmentName', message: 'Enter the department name:' }
        ]); // Prompt user for department name
        await addDepartment(departmentName); // Add department to the database
        console.log('Department added.'); // Confirmation message
        break;

      case 'Add a role':
        await addRole(); // Call function to add a role
        console.log('Role added.'); // Confirmation message
        break;

      case 'Add an employee':
        const rolesList = await viewAllRoles(); // Fetch all roles for selection
        const employeesList = await viewAllEmployees(); // Fetch all employees for manager selection

        // Prompt user for employee details
        const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
          { type: 'input', name: 'firstName', message: 'Enter the employee’s first name:' },
          { type: 'input', name: 'lastName', message: 'Enter the employee’s last name:' },
          {
            type: 'list',
            name: 'roleId',
            message: 'Select the role for this employee:',
            choices: rolesList.map(role => ({ name: role.title, value: role.id })) // Display roles as choices
          },
          {
            type: 'list',
            name: 'managerId',
            message: 'Select the manager for this employee (select None if there is no manager):',
            choices: [
              { name: 'None', value: null }, // Option for no manager
              ...employeesList.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
              })) // Display employees as manager choices
            ]
          }
        ]);

        await addEmployee(firstName, lastName, roleId, managerId); // Add employee to the database
        console.log('Employee added.'); // Confirmation message
        break;

      case 'Update an employee role':
        const employeesForUpdate = await viewAllEmployees(); // Fetch all employees for selection
        const rolesForUpdate = await viewAllRoles(); // Fetch all roles for selection

        // Prompt user for employee and new role details
        const { employeeIdForUpdate, newRoleIdForUpdate } = await inquirer.prompt([
          {
            type: 'list',
            name: 'employeeIdForUpdate',
            message: 'Select the employee whose role you want to update:',
            choices: employeesForUpdate.map(employee => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id
            })) // Display employees as choices
          },
          {
            type: 'list',
            name: 'newRoleIdForUpdate',
            message: 'Select the new role for this employee:',
            choices: rolesForUpdate.map(role => ({
              name: role.title,
              value: role.id
            })) // Display roles as choices
          }
        ]);

        await updateEmployeeRole(employeeIdForUpdate, newRoleIdForUpdate); // Update employee role in the database
        console.log('Employee role updated.'); // Confirmation message
        break;

      case 'Exit':
        console.log('Exiting...'); // Exit message
        continueApp = false; // Set loop control variable to false to exit
        break;

      default:
        console.log('Invalid action.'); // Error message for invalid action
    }
  }
};

// Start the application
startPrompt();