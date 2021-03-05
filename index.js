const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
//const dbAllDept = require('./dbQueries/queries');

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
          console.log('\n');
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
              dbAllEmployees();
              break;
            case 'add a department': 
              console.log('I made the connection!!!add a department');    
              dbAddDept();          
              break;
            case 'add a role': 
              console.log('I made the connection!!!add a role');
              dbAddRole();  
              break;
            case 'add an employee': 
              console.log('I made the connection!!!add an employee');
              dbAddEmployee();  
              break;
            case 'update an employee role': 
              console.log('I made the connection!!!update an employee role');
              //dbUpdateEmployeeRole();  
              break;
            default:
              console.log('Almost there');
          };
  });
};

inqStart();  // <-- Everything starts here

////////////////////////

dbAllRoles= () => {
  console.log('Select all the roles...\n');
  connection.query('SELECT * FROM roles', function(err, res) {
      if(err) throw err;
      //Show all the results
      console.table(res);

      inqStart();
  });
};

dbAllDept = () => {
    console.log('Select all the department...\n');
    connection.query('SELECT * FROM department', function(err, res) {
        if(err) throw err;
        //Show all the results
        console.table(res);

        inqStart();
    });
};

dbAllEmployees = () => {
  console.log('Select all the employees...\n');
  connection.query('SELECT * FROM employee', function(err, res) {
      if(err) throw err;
      //Show all the results
      console.table(res);

      inqStart();
  });
};

//Add a new Department
dbAddDept = () => {
  console.log('Add a new dept...\n');

  const result = 'readsdfsdfsdf';

  inquirer.prompt([
    {
      type: 'input',
      name: 'names',
      message: 'Enter new department name here: '
    }
  ]).then(ans => {
    result = ans.names;
  });
   
  const querry = 'INSERT INTO department (names) VALUES ("'+result+'")';

  connection.query(querry, function(err, res) {
      if(err){
        console.log(err);
        throw err;
      } 
      //Show all the results
      console.table(res);

      inqStart();
  });
};