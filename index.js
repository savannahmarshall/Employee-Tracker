const inquirer = require('inquirer');

const displayBanner = () => {
  const reset = '\x1b[0m';
  const pink = '\x1b[38;5;198m';
  console.log(`
    ${pink}
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♥                                         ♥
♥           EMPLOYEE TRACKER              ♥
♥                                         ♥
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
${reset}
  `);
};

displayBanner();

// Define questions
const questions = [
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
];

// Function to start prompts
const startPrompt = async () => {
  const answers = await inquirer.prompt(questions);
  
  switch (answers.action) {
    case 'View all departments':
      // Call function to view all departments
      console.log('Viewing all departments...');
      break;
    case 'View all roles':
      // Call function to view all roles
      console.log('Viewing all roles...');
      break;
    case 'View all employees':
      // Call function to view all employees
      console.log('Viewing all employees...');
      break;
    case 'Add a department':
      // Call function to add a department
      console.log('Adding a department...');
      break;
    case 'Add a role':
      // Call function to add a role
      console.log('Adding a role...');
      break;
    case 'Add an employee':
      // Call function to add an employee
      console.log('Adding an employee...');
      break;
    case 'Update an employee role':
      // Call function to update an employee role
      console.log('Updating an employee role...');
      break;
    case 'Exit':
      console.log('Exiting...');
      process.exit();
      break;
    default:
      console.log('Invalid action.');
  }

  // Restart prompt after completing the action
  startPrompt();
};

// Start prompts
startPrompt();