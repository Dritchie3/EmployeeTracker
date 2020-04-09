var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "!123Bobby123",
database: "employeesDB"
});
function runSearch(){
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "Please Select:",
        choices: [
            "Add Employee",
            "Add Department",
            "Add Role",
            "View Employees",
            "View Departments",
            "View Roles",
            "exit"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "View Employee":
          viewEmployee();
          break;
        case "View Department":
          viewDepartment();
          break;
        case "View Role":
          viewRole();
          break;
        case "exit":
          connection.end();
          break;
        }
      });
  }

function addEmployee(){

};
function addDepartment(){

};
function addRole(){

};
function viewEmployee(){

};
function viewDepartment(){

};
function viewRole(){

};


// function artistSearch(){
// inquirer
// .prompt({
//     name: "artist",
//     type: "input",
//     message: "What artist would you like to search for?"
// })
// .then(function(answer){
//     var query = "SELECT ranking, title, year FROM Top5000 WHERE ?";
//     connection.query(query, {  artist: answer.artist  }, function(err, res){
//         if (err) throw err;
//         for(var i = 0; i < res.length; i++){
//             console.log("Ranking: " + res[i].ranking + " || Title: " + res[i].title + " || Year: " + res[i].year);
//         }
//         runSearch();
//     });
// });
// }
// function multiSearch(){
// }
// function rangeSearch(){
//     inquirer
//     .prompt({
//         name: "start",
//         type: "input",
//         message: "Enter starting year"
//     },
//     {
//         name: "end",
//         type: "input",
//         message: "Enter ending year"
//     }
//     )
// }
// function songSearch(){
// inquirer
// .prompt({
//     name: "song",
//     type: "input",
//     message: "What song would you like to search for?"
// })