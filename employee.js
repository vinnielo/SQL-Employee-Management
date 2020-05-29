var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table")

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
          "Add Department",
          "Add Role",
          "Update Employee Role",
          //   "Update Employee Manager",
          "View All Roles",
          "View All Departments",
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
          viewByManager();
          break;

        case "Add Employee":
          addEmp();
          break;

        case "Add Department":
          addDept()  
          break;

        case "Add Role":
            addRole()
          break;

        case "Update Employee Role":
          updateEmpRole();
          break;

        // case "Update Employee Manager":
        //   updateEmpManager()
        //   break;

        case "View All Roles":
          allRoles();
          break;

        case "View All Departments":
          allDepts();
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
    console.log("\n")
    console.table(res)
    
  });

  start();
}

function allRoles() {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.log("\n")
    console.table(res)
  });

  start();
}

function allDepts() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.log("\n")
    console.table(res)
  });

  start();
}

function allDepartments() {
  connection.query(
    "SELECT * FROM employee INNER JOIN department ON department.id = employee.department_id INNER JOIN roles ON roles.id = employee.role_id ORDER BY department.dept_name",
    function (err, res) {
      if (err) throw err;
        console.log("\n")
        console.table(res)
   
    }
  );

  start();
}

function addEmp() {
  inquirer
    .prompt([
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
      {
        type: "input",
        name: "manager",
        message: "Does the employee have a manager? "
    
      }
    ])
    .then((answer) => {
        console.log(answer)
      connection.query(
        "INSERT INTO employee SET ?",
        {
          emp_id: answer.emp_id,
          first_name: answer.first,
          last_name: answer.last,
          role_id: answer.role,
          department_id: answer.department,
          manager_id: answer.manager || null
        },
        function (err, res) {
          if (err) throw err;
         

          console.log(()=>{
            allEmployees()
          });
        }
        
      );
        
      start();
    });
}

function viewByManager() {

  connection.query(
    "SELECT * FROM employee INNER JOIN department ON department.id = employee.department_id INNER JOIN roles ON roles.id = employee.role_id ORDER BY employee.manager_id",
    function (err, res) {
      if (err) throw err;
     console.log("\n")
     console.table(res)
    }
  );

  start();
}

function updateEmpRole() {
  connection.query("SELECT * FROM employee", function (err, res) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "empNm",
          message: "Select Employee to update",
          choices: function (value) {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push({name:`${res[i].first_name} ${res[i].last_name}`, value: res[i].emp_id});
            }
            return choiceArray;
          },
        },
      ])
      .then((answer) => {
         var eID = answer.empNm
        connection.query("SELECT roles.id AS rid, roles.title, roles.department_id AS did FROM roles INNER JOIN department ON roles.department_id = department.id", function (err, res) {
          inquirer
            .prompt([
              {
                type: "list",
                name: "empRole",
                message: "What is their new role?",
                choices: function (value) {
                  var roleArray = [];
                  for (var i = 0; i < res.length; i++) {
                    roleArray.push({name: res[i].title, value: { rid: res[i].rid, did: res[i].did }});
                  }
                  return roleArray;
                },
              },
            ])
            .then((answer) => {
            console.log("this is working")
              console.log(answer);
              connection.query(
                "UPDATE employee SET ? WHERE ?",
                [{
                    role_id: answer.empRole.rid,
                    department_id: answer.empRole.did
                    
                },{
                    emp_id: eID
                }],
                function (err, res) {
                  if (err) throw err;
                  
                  console.log(`Updated employee's role!`);
                  allEmployees();
                }
                );
            });
        });
      });
  });
}

function addDept() {
    inquirer
    .prompt([
      {
        type: "input",
        name: "dept",
        message: "Please add a department",
      }
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          id: answer.id,
          dept_name: answer.dept
        },
        function (err, res) {
          if (err) throw err;
          allEmployees();

          console.log("done");
        }
      );
      start();
    });
};

function addRole() {
    inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "Please add a new role",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Please add the starting salary",
      },
      {
        type: "input",
        name: "roleDeptId",
        message: "Please add the corresponding department ID?"
      }
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          id: answer.id,  
          department_id: answer.roleDeptId,
          title: answer.roleName,
          salary: answer.roleSalary
        },
        function (err, res) {
          if (err) throw err;
          allEmployees();

          console.log("done");
        }
      );
      start();
    });
};
// function updateEmpManager() {
//   connection.query("SELECT * FROM employee", function (err, res) {
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "empNm1",
//           message: "Select Employee to edit",
//           choices: function (value) {
//             var choiceArray = [];
//             for (var i = 0; i < res.length; i++) {
//               choiceArray.push(`${res[i].first_name} ${res[i].last_name}`);
//             }
//             return choiceArray;
//           },
//         },
//         {
//           type: "list",
//           name: "empMan",
//           message: "Who is their new manager?",
//           choices: function (value) {
//             var roleArray = [];
//             for (var i = 0; i < res.length; i++) {
//               roleArray.push(res[i].manager_id);
//             }
//             return roleArray;
//           },
//         },
//       ])
//       .then((answer) => {
//         console.log(answer);
//         connection.query(
//           "UPDATE employee SET ? WHERE ?",
//           [
//             {
//               manager_id: answer.empMan,
//             },
//           ],
//           function (err, res) {
//             if (err) throw err;
//             allEmployees();

//             console.log("updated");
//           }
//         );
//         start();
//       });
//   });
// }
