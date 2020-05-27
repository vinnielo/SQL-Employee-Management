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
  database: "employee_managment_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start()
});


function start() {
    inquirer.prompt([{
        name: "init",
        type: "list",
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'View All Employees by Department',
            'View All Employees by Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View All Roles',
            'Exit' 
        ]
    }]).then((answer) => {
        switch (answer.init){
            case "View All Employees":
                allEmployees();
                break;

            case "View All Employees by Department":

                break;

            case "View All Employees by Manager":

                break;

            case "Add Employee":

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

    })

};

function allEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;  
        console.log(`-----------------\n ID || NAME || ROLE_ID || MANAGER_ID`)    
        for (var i = 0; i < res.length; i++) {
                    console.log(`-----------------\n ${res[i].id} || ${res[i].first_name} ${res[i].last_name} || ${res[i].role_id} || ${res[i].manager_id}`);
        }
    })
    

    start();
};