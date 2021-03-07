const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
          "view employee by manager",
          "view employee by department",
          "delete a department",
          "exit",
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
        case "view employee by manager":
          console.log("I made the connection!!!view employee by manager");
          dbViewEmployeeByManager();
          break;
        case "view employee by department":
          console.log("I made the connection!!!view employee by department");
          dbViewEmployeeByDepartment();
          break;
        case "delete a department":
          console.log("I made the connection!!!remove a department");
          dbDeleteDept();
          break;
        case "delete a role":
          console.log("I made the connection!!!remove a role");
          dbDeleteRole();
          break;
        case "delete an employee":
          console.log("I made the connection!!!remove an employee");
          dbDeleteEmployee();
          break;
        case "exit":
          console.log("Good bye");
          dbConnectionEnd();
          break;
      }
    });
};
//starts the connection
main();

inqStart(); // <-- Everything starts here

//END connection
const dbConnectionEnd = () => {
  connection.close();
};

//View all Departments
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

//View all Roles
dbAllRoles = async () => {
  console.log("Select all the roles...");

  try {
    const [rows] = await connection.execute("SELECT * FROM roles");
    console.log("\n");
    //Show all the results
    console.table(rows);
  } catch (error) {
    console.log("Error: " + error);
  }

  inqStart();
};

//View all Employees
const dbAllEmployees = async () => {
  console.log("Select all the employees...");

  try {
    const [rows] = await connection.execute("SELECT * FROM employee");
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

  inqStart();
};

//Add a new Role
const dbAddRole = async () => {
  console.log("Add a new role...");

  await inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter title here: ",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter salary here: ",
      },
      {
        type: "input",
        name: "dept_id",
        message: "Enter department id here: ",
      },
    ])
    .then(async ({ title, salary, dept_id }) => {
      try {
        const [
          rows,
        ] = await connection.execute(
          "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?);",
          [title, salary, dept_id]
        );
        console.log("\n");
        console.table(rows);
      } catch (error) {
        console.log("Error: " + error);
      }
    });

  inqStart();
};

//Add a new Employee
const dbAddEmployee = async () => {
  console.log("Add a new role...");

  await inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter employee id here: ",
      },
      {
        type: "input",
        name: "first_name",
        message: "Enter first name here: ",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter last name id here: ",
      },
      {
        type: "input",
        name: "roles_id",
        message: "Enter role id here: ",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter manager's id here: ",
      },
    ])
    .then(async ({ id, first_name, last_name, roles_id, manager_id }) => {
      try {
        const [
          rows,
        ] = await connection.execute(
          "INSERT INTO employee (id,first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?,?);",
          [id, first_name, last_name, roles_id, manager_id]
        );
        console.log("\n");
        console.table(rows);
      } catch (error) {
        console.log("Error: " + error);
      }
    });

  inqStart();
};

//Update an Employee role
const dbUpdateEmployeeRole = async () => {
  console.log("Update an employee role...");

  await inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter employee's first here: ",
      },
      {
        type: "input",
        name: "title",
        message: "Enter New title/role here: ",
      },
    ])
    .then(async ({ first_name, title }) => {
      try {
        const [rows] = await connection.execute(
          `UPDATE roles 
           LEFT JOIN employee ON roles.id=employee.id
           SET title = '${title}'
           WHERE first_name = '${first_name}';`
        );
        console.log("\n");
        console.table(rows);
      } catch (error) {
        console.log("Error: " + error);
      }
    });

  inqStart();
};

//View employees by Manager
const dbViewEmployeeByManager = async () => {
  console.log("View employee by manager...");

  await inquirer
    .prompt([
      {
        type: "input",
        name: "manager_id",
        message: "Enter manager id here: ",
      },
    ])
    .then(async ({ manager_id }) => {
      try {
        const [rows] = await connection.execute(
          `SELECT * FROM employee
           WHERE manager_id = '${manager_id}';`
        );
        console.log("\n");
        console.table(rows);
      } catch (error) {
        console.log("Error: " + error);
      }
    });

  inqStart();
};

//View employees by Department
const dbViewEmployeeByDepartment = async () => {
  console.log("View employee by department...");

  await inquirer
    .prompt([
      {
        type: "input",
        name: "dep_name",
        message: "Enter department name here: ",
      },
    ])
    .then(async ({ dep_name }) => {
      try {
        const [rows] = await connection.execute(
          `SELECT 
          r.*
          FROM roles r
          RIGHT JOIN employee e ON e.roles_id = r.id
          LEFT JOIN department d ON d.id = r.department_id
          WHERE manager_id = '${dep_name}';`
        );
        console.log("\n");
        console.table(rows);
      } catch (error) {
        console.log("Error: " + error);
      }
    });

  inqStart();
};

//Delete a Department
const dbDeleteDept = async () => {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "departmentDel",
        message: "Which department are you removing? ",
      },
    ])
    .then(async ({ departmentDel }) => {
      try {
        const [
          rows,
          fields,
        ] = await connection.execute(`DELETE FROM department WHERE names=?`, [
          departmentDel,
        ]);
        console.log("\n");
        console.table(rows);
      } catch (error) {
        console.log("Error: " + error);
      }
    });

  inqStart();
};

//Delete a Role
const dbDeleteRole = async () => {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "roleDel",
        message: "Which role are you removing? ",
      },
    ])
    .then(async ({ roleDel }) => {
      try {
        const [
          rows,
          fields,
        ] = await connection.execute(`DELETE FROM roles WHERE names=?`, [
          roleDel,
        ]);
        console.log("\n");
        console.table(rows);
      } catch (error) {
        console.log("Error: " + error);
      }
    });

  inqStart();
};

//Remove an Employee
const dbDeleteEmployee = async () => {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "employeeDel",
        message: "Which employee are you removing? ",
      },
    ])
    .then(async ({ employeeDel }) => {
      try {
        const [
          rows,
        ] = await connection.execute(`DELETE FROM employee WHERE names=?`, [
          employeeDel,
        ]);
        console.log("\n");
        console.table(rows);
      } catch (error) {
        console.log("Error: " + error);
      }
    });

  inqStart();
};
