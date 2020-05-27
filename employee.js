var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Balley01!",
  database: "employee_managment_db",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt([
      {
        name: "init",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees by Department",
          "View All Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View All Roles",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.init) {
        case "View All Employees":
          allEmployees();
          break;

        case "View All Employees by Department":
          allDepartments();
          break;

        case "View All Employees by Manager":
          break;

        case "Add Employee":
          addEmp()
          break;
        case "Remove Employee":
          break;

        case "Update Employee":
          break;

        case "Update Employee Role":
          break;

        case "Update Employee Manager":
          break;

        case "View All Roles":
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function allEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.log(`-----------------\n ID || NAME || ROLE_ID || MANAGER_ID`);
    for (var i = 0; i < res.length; i++) {
      console.log(
        `-----------------\n ${res[i].id} || ${res[i].first_name} ${res[i].last_name} || ${res[i].role_id} || ${res[i].manager_id}`
      );
    }
  });

  start();
}

function allDepartments() {
//   var query = "SELECT * FROM employee";
//   query +=
//     "FROM employee INNER JOIN roles ON roles.id = employee.role_id AND roles.department_id";
  // query += "FROM roles INNER JOIN department ON department.id = roles.department_id AND department.dept_name"
  // query += "ORDER BY department.dept_name"
  connection.query("SELECT * FROM employee INNER JOIN roles ON roles.id = employee.role_id AND roles.department_id ", function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      console.log(
        `-----------------\n -----------------\n ${res[i].id} || ${res[i].first_name} ${res[i].last_name} || ${res[i].role_id} || ${res[i].manager_id} || ${res[i].title} || ${res[i].salary} || ${res[i].department_id}`
      );
    }
  });

  start();
}

function addEmp(){
    inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "Enter Employee First Name: ",
        },
        {
            type: "input",
            name: "last",
            message: "Enter Employee Last Name: ",
        },
        {
            type: "input",
            name: "role",
            message: "Enter Employee's Role ID: ",
        },
        {
            type: "input",
            name: "department",
            message: "Enter Employee's Department ID: ",
        },
    ]).then(answer => {

        connection.query(
            "INSERT INTO employee SET ?",
            {
                id: answer.id,
                first_name: answer.first,
                last_name: answer.last,
                role_id: answer.role,
                department_id: answer.department

            }, function (err, res) {
                if (err) throw err;
                allEmployees();

                console.log('done')
            })
            start();
    })
}
