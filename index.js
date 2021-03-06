const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const cTable = require("console.table");
//const dbAllDept = require('./dbQueries/queries');

let connection = null;
//Create the connection to database
async function main() {
  connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "*GetDone21$#",
    database: "company_employees",
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
  });
}

const inqStart = function () {
  inquirer
    .prompt([
      {
        type: "list",
        name: "allOptions",
        message: "What please choose which action you would like to perform.",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "delete a department",
          "exit" /*EXTRA*/,
        ],
      },
    ])
    .then((ans) => {
      switch (ans.allOptions) {
        case "view all departments":
          console.log("I made the connection!!!departments");
          dbAllDept();
          break;
        case "view all roles":
          console.log("I made the connection!!!roles");
          dbAllRoles();
          break;
        case "view all employees":
          console.log("I made the connection!!!employees");
          dbAllEmployees();
          break;
        case "add a department":
          console.log("I made the connection!!!add a department");
          dbAddDept();
          break;
        case "add a role":
          console.log("I made the connection!!!add a role");
          dbAddRole();
          break;
        case "add an employee":
          console.log("I made the connection!!!add an employee");
          dbAddEmployee();
          break;
        case "update an employee role":
          console.log("I made the connection!!!update an employee role");
          dbUpdateEmployeeRole();
          break;
        case "delete a department":
          console.log("I made the connection!!!update an employee role");
          dbDeleteDept();
          break;
        default:
          console.log("Almost there");
          dbConnectionEnd();
      }
    });
};

main();
inqStart(); // <-- Everything starts here

////////////////////////

const dbAllRoles = async () => {
  console.log("Select all the roles...");

  try {
    const [rows, fields] = await connection.execute("SELECT * FROM roles");
    console.log("\n");
    //Show all the results
    console.table(rows);
  } catch (error) {
    console.log("Error: " + error);
  }

  inqStart();
};

const dbConnectionEnd = () => {};

const dbAllDept = async () => {
  console.log("Select all the departments...");

  try {
    const [rows, fields] = await connection.execute("SELECT * FROM department");
    console.log("\n");
    console.table(rows);
  } catch (error) {
    console.log("Error: " + error);
  }

  inqStart();
};

const dbAllEmployees = async () => {
  console.log("Select all the employees...");

  try {
    const [rows, fields] = await connection.execute("SELECT * FROM employee");
    console.log("\n");
    console.table(rows);
  } catch (error) {
    console.log("Error: " + error);
  }

  inqStart();
};

//Add a new Department
const dbAddDept = async () => {
  console.log("Add a new dept...");

  /////
  await inquirer
    .prompt([
      {
        type: "input",
        name: "names",
        message: "Enter new department name here: ",
      },
    ])
    .then(async ({ names }) => {
      try {
        const [
          rows,
          fields,
        ] = await connection.execute(
          "INSERT INTO department (names) VALUES (?);",
          [names]
        );
        console.log("\n");
        console.table(rows);
      } catch (error) {
        console.log("Error: " + error);
      }
    });
  /////

  inqStart();
};

const dbDeleteDept = async ()=> {

  await inquirer
    .prompt([
      {
        type: "input",
        name: "departmentDel",
        message: "Which department are you deleting? ",
      },
    ])
    .then(async ({ departmentDel }) => {
      try {
        const [
          rows,
          fields,
        ] = await connection.execute(
          `DELETE FROM department WHERE names=?`,
          [departmentDel]
        );
        console.log("\n");
        console.table(rows);
      } catch (error) {
        console.log("Error: " + error);
      }
    });

  inqStart();
};
