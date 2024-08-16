# Employee-Tracker

## Description
This command-line application functions as an employee tracker that can be used to view and manage the deparments, roles and employees in a company. It allows the user to organize each employee into tables by id, first and last name, job title, job deparment, salary and manager. The data can be sorted into three different tables by department, role and employees. This application utilizes Node.js, Inquirer and PostgreSQL to solve the real world problem of managing a companies employee database in a way that is user friendly and efficient.

### Key Learnings:
* **Command-Line App Skill Development:** Utilized Node.js, Inquirer and PostgreSQL to create an efficient command-line application.
* **PostgreSQL and Pg Package:** Utilized pg package to connect and store data into PostreSQL database.
* **Pg Admin:** Utilized Pg Admin to view data tables in database.
* **Display Banner:** Created a display banner with ANSI escape codes to add custimizaion and personal touch to application.
  
## Table of Contents
  
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
To use this application, you must install [Node.js](https://nodejs.org/en).

## Usage

To use this application, follow these steps:

1. **Ensure Node.js is Installed:** Confirm that Node.js is installed on your machine. If not, download and install it from the official Node.js website which can be found in the installation section above.

2. **Install Dependencies:** Navigate to the project folder in your command-line and run the following commands to install the necessary dependencies:
   * npm i inquirer@8.2.4
3. **Run the Application:** Initialize the command-line application by typing:
   * node index.js
5. **Selection Options:**
   * View all departments: Select view all departments to see a table with a list of all existing departments with a unique ID for each one.
   * View all roles: Select view all roles to see a table with a list that sorts data by id, job title, salary and department.
   * View all roles: Select view all roles to see a table that sorts data by id, employee first and last name, job title, department, salary and manager if applicable.
   * Add a department: If the user selects add a department, they will be prompted to enter the department name. They can view this new department by selecting view all departments.
   * Add a role: If the user selects add a role, they will be prompoted to enter the role title, salary and select a department from a drop down list of saved departments. They can view this new role by selecting view all roles.
   * Add an employee: If the user selects add an employee, they will be prompted to enter the employees first name, last name, select a role from a down down list of saved roles and select a manager from the list of saved employees.
   * Update and employee role: If the user wants to update an employee role, they will be prompted to select the employe whose role they wish to update and select the new role for that employee from the list of saved roles.
**Please click [here]() to view a demo on how to use this application.**


![screenshot of application](https://github.com/savannahmarshall/Employee-Tracker/blob/main/assets/employee-tracker-screenshot.png)



## Contributing
* [JavaScript](https://www.javascript.com/)
* [Node.js](https://nodejs.org/en)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [PostgreSQL](https://www.postgresql.org/)

## License
This project was created using the [MIT License](https://opensource.org/license/MIT).

## Tests
There are no tests for this application.

## Questions
Please contact me directly with any questions. My information is below:  

**GitHub:** https://github.com/savannahmarshall  

**Email:** savvymarshall@gmail.com
