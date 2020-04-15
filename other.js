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
     ])   //TODO
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
            case "Go Back":
                runSearch();
                break;
            case "exit":
                connection.end();
                break;
            
        };
     });
    };