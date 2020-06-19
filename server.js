const inquirer = require("inquirer");
let Database = require("./db");
let cTable = require("console.table");

const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "tracker_db"
  });
  
/*
  Start of calls to the database 
*/
async function getManagerNames() {
    let query = "SELECT * FROM employee WHERE manager_id IS NULL";

    const rows = await db.query(query);
    //console.log("number of rows returned " + rows.length);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}