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
  empManager()
});


function empManager() {
    inquirer.prompt([{
        name: "init",
        type: "list",
        message: 'Choose a function',
        choices: [
            'View a Table',
            'Insert Data into a Table',
            'Update an Employee' ,
            'Exit' 
        ]
    }]).then((answer) => {
        switch (answer.init){
            case "View a Table":

                break;

            case "Insert Data into a Table":

                break;

            case "Update an Employee":

                break;

            case "Exit":
                connection.end();
                break;
        }

    })

};

