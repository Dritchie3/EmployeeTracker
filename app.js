const mysql = require("mysql");
const inquirer = require("inquirer");
const logo = require("asciiart-logo")
const connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "!123Bobby123",
database: "employeeDB"
});

// ASCII ART when app starts 
console.log(
    logo({
        name: 'EMPLOYEE MANAGER',
        font: 'Speed',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'bold-green',
        logoColor: 'bold-green',
        textColor: 'green',
    })
    .emptyLine()
    .right('version 1.0.0')
    .emptyLine()
    .render()
);

// const util = require('util');
// connection.query = util.promisify(connection.query);

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
            "Update Employees Role",
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
          case "Update Employees Role":
            updateEmployeesRole();
            break;
          case "exit":
            connection.end();
            break;
        }
      })
  };
function addEmployee() {
  //TODO: get the possible Managers
  connection.query("SELECT employees.first_name, employees.last_name, employees.id FROM employeedb.role as role JOIN employeedb.employees as employees ON role.id = employees.role_id WHERE role.department = 1;", function(err,manResp){
    const managerList= manResp.map(rdp=> rdp.first_name + " " + rdp.last_name)
    managerList.push("None=> top dog")
    managerList.push("Not Listed")
  //TODO: get the possible Roles (dept is determined by role)
  connection.query("SELECT title,role.id FROM employeedb.role;", function(err,roleRes){
    const roleList = roleRes.map(rdp=> rdp.title)



 // add Department if not created yet 





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
      type: 'list',
      message: "Enter Employee Role",
      choices: roleList
      },
      {
      name: 'manager',
      type: 'list',
      message: "Enter Employees Manager",
      choices: managerList
      },
    ])
    .then(function (response) {
      if(response.manager === "Not Listed"){
        console.log("Please Create the Manager First!")
        runSearch();
         return;
      }
      if(response.role === "Not Listed"){
        console.log("Please Create the Role First!")
       addRole();
         return;
      }
      let firstName = response.first;
      let lastName = response.last;
     // let role = response.role;
      let department = response.department;
      // console.log('response.manager = ' + response.manager);
      let managerIndex = managerList.indexOf(response.manager);
      let manager;
      if (managerIndex===manResp.length){
        console.log("HURRAY")
        manager= null
      }else{
        manager = manResp[managerIndex].id;
      }   
      let roleIndex = roleList.indexOf(response.role);
      let role =roleRes[roleIndex].id;       
      // let deptIndex = deptList.indexOf(response3.department);
      // let department =deptRes[deptIndex].id;       
      // let salary = response.salary;
           
      connection.query(
        "INSERT INTO employees SET ?",
        { first_name: firstName,
          last_name: lastName,
          role_id: role,
          manager: manager
        },
        function(err,res) {
          if(err) throw err;
          //console.log(res);//make sure it worked
          runSearch()
          // break;
        }
      );
      }) 
    })
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
    console.log('department', department);
  let query = connection.query(
      "INSERT INTO department SET ?",
      { department: department
      },
      function(err,res) {
        if(err) throw err;
        runSearch();
        return;
      })
    })     
    };  

function addRole(){
  connection.query("SELECT * FROM employeedb.department;", function(err,deptRes){
    const deptList = deptRes.map(rdp=> rdp.department);
    deptList.push("Not Listed")
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
      type: 'list',
      message: "Enter Department",
      choices: deptList
    },
  ])
    .then(function(response3){
      if(response3.department === "Not Listed"){
        console.log("Please create the department first")
        addDepartment();
        return;
      }
      let role = response3.role;
      let salary = response3.salary;
        //.department = response3.department;
      let deptIndex = deptList.indexOf(response3.department);
      let department =deptRes[deptIndex].id;
   
connection.query(
    "INSERT INTO role SET ?",
    { title: role,
      salary: salary,
      department: department
    },
    function(err,res) {
      if(err) throw err;
      console.log('Role Added');
      runSearch();
    }
  );
  })
  })
};

function viewEmployees(){
  connection.query("SELECT * FROM employees", (err,data) => {
    if(err) throw err;
    console.table(data);
    runSearch();
  }); 
};

function viewDepartments(){
  connection.query("SELECT * FROM department", (err,data) => {
    if(err) throw err;
    console.table(data);
    runSearch();
    // break;
  });
};

function viewRoles(){
  connection.query("SELECT * FROM role", (err,data) => {
    if(err) throw err;
    console.table(data);
    runSearch();
    // break;
  });
};
function updateEmployeesRole(){
  connection.query("SELECT title,role.id FROM employeedb.role;", function(err,roleRes){
    console.log(roleRes)
    const roleList = roleRes.map(rdp=> rdp.title);
    console.log(roleList)
  connection.query("SELECT * FROM employees", (err,data) => {
    if(err) throw err;
    console.table(data);
    
    inquirer
    .prompt([{
      name: 'id',
      type: 'input',
      message: "Enter Employee id to change thier role "
    },
    {
      name: 'role',
      type: 'list',
      message: 'Choose new Role',
      choices: roleList
    }
  ])
  .then( answers => {
    console.log(roleList);
    console.log('answers', answers);
    let roleIndex = roleList.indexOf(answers.role);
      let role =roleRes[roleIndex].id;
    connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [role, answers.id] )
    runSearch();
    // break;
  })


});
  });
};

runSearch();
