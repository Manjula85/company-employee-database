const mysql = require('mysql2');
const inquirer = require('inquirer');

//Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: '*GetDone21$#',
    database: 'company_employees'    
});

connection.connect(err => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    output();
});

var questions = [
  {
    type: 'list',
    name: 'startOff',
    message: 'Choose which one you\'d like to do',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 
    'add a role', 'add an employee', 'update an employee role']
  }
    //Validate here
];
/////////////////////////
inquirer
.prompt(questions)
  .then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
  })
  .catch(error => {
    if(error.isTtyError) {
      console.log('There is an error somewhere.');// Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
////////////////////////

output = () => {
    console.log('Select all the department...\n');
    connection.query('SELECT * FROM department', function(err, res) {
        if(err) throw err;
        //Show all the results
        console.log(res);

        connection.end();
    });
};