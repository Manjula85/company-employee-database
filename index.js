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

/////////////////////////
inquirer
.prompt([
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
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