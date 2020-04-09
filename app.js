const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "!123Bobby123",
database: "employeeDB"
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
            "Other",
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
        case "View Employees":
          viewEmployees();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "Other":
          other();
          break;
        case "exit":
          connection.end();
          break;
        }
      })
  };
function addEmployee() {
  inquirer
    .prompt([
      {
      name: 'first',
      type: 'input',
      message: "Enter Employee's First Name"
      },
      {
      name: 'last',
      type: 'input',
      message: "Enter Employee's Last Name"
      },
      {
      name: 'role',
      type: 'input',
      message: "Enter Employee Role"
      },
      {
      name: 'department',
      type: 'input',
      message: "Enter Employee's Department"
      },
      {
      name: 'manager',
      type: 'input',
      message: "Enter Employees Manager"
      },
      {
      name: 'salary',
      type: 'input',
      message: "Enter Employee's Salary"
      }
    ])
    .then(function (response) {
      firstName = response.first;
      lastName = response.last;
      role = response.role;
      department = response.department;
      manager = response.manager;
      salary = response.salary;
            
let query = connection.query(
  "INSERT INTO employees SET ?",
  { first_name: firstName,
    last_name: lastName,
    role_id: role,
    manager: manager
  },
  function(err,res) {
    if(err) throw err;
  }
);
})  
};

function addDepartment(){
  inquirer 
    .prompt([{
      name: 'department',
      type: 'input',
      message: "Enter Department"
    }])
    .then(function(response2) {
       department = response2.department;
    
  let query = connection.query(
      "INSERT INTO department SET ?",
      { department: department
      },
      function(err,res) {
        if(err) throw err;
      })
    })     
    };  

function addRole(){
  inquirer
    .prompt([{
      name: 'role',
      type: 'input',
      message: "Enter New Role"
    },
    {
      name: 'salary',
      type: 'input',
      message: "Enter Salary"
    },
    {
      name: 'department',
      type: 'input',
      message: "Enter Department"
    },
  ])
    .then(function(response3){
      role = response3.role;
      salary = response3.salary;
      department = response3.department;
   
let query = connection.query(
    "INSERT INTO role SET ?",
    { role_id: role,
      salary: salary,
      department: department
    },
    function(err,res) {
      if(err) throw err;
    }
  );
  })  
};

function viewEmployees(){
  connection.query("SELECT * FROM employees", (err,data) => {
    if(err) throw err;
    console.table(data);
  }); 
};

function viewDepartments(){
  connection.query("SELECT * FROM department", (err,data) => {
    if(err) throw err;
    console.table(data);
  });
};

function viewRoles(){
  connection.query("SELECT * FROM role", (err,data) => {
    if(err) throw err;
    console.table(data);
  });
};

function other() {
  inquirer
    .prompt([{ 
        name: 'newAction',
        type: 'list',
        message: 'Please Select',
        choices: [
          "Enter Employee's Salary",
          'View Employees by Manager',
          'Delete Departments',
          'Delete Roles',
          'Delete Employees'        ]
    }   
   ])   
   .then(function(answer) {
      switch (answer.newAction) {
        case "Update Employees Manager":
          updateManager();
          break;
        case "View Employees by Manager":
          viewEmployeeByManager();
          break;
        case "Delete Departments":
          departmentDel();
          break;
        case "Delete Roles":
          rolesDel();
          break;
        case "Delete Employees":
          employeeDel();
          break;
      };
   });
  };

runSearch();
