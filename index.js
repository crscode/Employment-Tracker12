var inquirer = require("inquirer");
var consoleTable = require("console.table");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8000,
  user: "root",
  password: "root",
  database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
  });
  
  function runSearch() {
    inquirer
      .prompt({
        type: "list",
        name: "action",
        message: "Tell me what you want to do?",
        choices: ["View all employees",
          "View all departments",
          "View all managers",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "Exit"]
  
      })
      .then(function (answer) {
        console.log(answer.action);
        switch (answer.action) {
          case "View all employees":
            employeeView();
            break;
  
          case "View all departments":
            departmentView();
            break;
  
          case "View all managers":
            managerView();
            break;
  
          case "Add Employee":
            employeeAdd();
            break;
  
          case "Add Department":
            departmentAdd();
            break;
  
          case "Add Role":
            roleAdd();
            break;
  
          case "Remove Employee":
            employeeRemove();
            break;
  
          case "Update Employee Role":
            employeeUpdate();
            break;
  
          case "Exit":
            connection.end();
            break;
        }
      });
  }
  function employeeView() {
    inquirer
      .prompt({
        name: "employeeView",
        type: "input",
        message: "What employee would you like to search for (last name ONLY)?"
      })
      .then(function (answer) {
        var query = "SELECT first_name, last_name, id FROM employee WHERE ?";
        connection.query(query, { last_name: answer.employeeView }, function (err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("First Name: " + res[i].first_name + " || Last name: " + res[i].last_name + " || Id: " + res[i].id);
          }
  
          runSearch();
        });
      });
  }
  
  function departmentView() {
    var query = "SELECT name FROM department";
    connection.query(query, function (err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].name);
      }
    });
  }
  
  function managerView() {
    var query = "SELECT id, first_name, last_name FROM Employee WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)";
    connection.query(query, function (err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].first_name + " " + res[i].last_name + " || Id: " + res[i].id);
      }
  
      runSearch();
    });
  }
