const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const dbAllDept = require('./dbQueries/queries');

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
});

const inqStart = function(){
  inquirer
      .prompt([
          {
              type: 'list',
              name: 'allOptions',
              message: 'What please choose which action you would like to perform.',
              choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 
              'add a role', 'add an employee', 'update an employee role', 'exit' /*EXTRA*/]
          }
      ])
      .then(ans => {
          console.log(ans.allOptions);
          dbAllDept();
          switch(ans.allOptions){
            case 'view all departments': 
              console.log('I made the connection!!!departments');
              dbAllDept();
              break;
            case 'view all roles': 
              console.log('I made the connection!!!roles');
              dbAllRoles();
              break;
            case 'view all employees': 
              console.log('I made the connection!!!employees');
              dbAllDeptEmployees();
              break;
            case 'add a department': 
              console.log('I made the connection!!!add a department');              
              break;
            case 'add a role': 
              console.log('I made the connection!!!add a role');
              break;
            case 'add an employee': 
              console.log('I made the connection!!!add an employee');
              break;
            case 'update an employee role': 
              console.log('I made the connection!!!update an employee role');
              break;
            default:
              console.log('Almost there');
          };
          //testInq();
  });
};


inqStart();  // <-- Everything starts here

////////////////////////

dbAllDept = () => {
    console.log('Select all the department...\n');
    connection.query('SELECT * FROM department', function(err, res) {
        if(err) throw err;
        //Show all the results
        console.table(res);

        inqStart();

        //connection.end();  //Does this ever get executed then?

    });
};

dbAllDeptEmployees = () => {
  console.log('Select all the employees...\n');
  connection.query('SELECT * FROM employee', function(err, res) {
      if(err) throw err;
      //Show all the results
      console.table(res);

      inqStart();

      //connection.end();  //Does this ever get executed then?

      //restartQ();
  });
};