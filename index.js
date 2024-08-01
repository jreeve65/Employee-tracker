/*TO DOS =============================================
1. Import the required packages 
2. set up and test inquier prompts
3 set up and test switch statements
4 set up database schema and test queries via sql*/
const inq = require('inquirer');
init();
function init(){
    runPrompts();
}

function runPrompts(){
    inq.prompt([
        {
        type: "list",
        name: "choice",
        message:"Pick an operation or select quit.",
        choices: [
            {
                name: "View All Employees",
                value: "VIEW_EMPLOYEES",
            },
                        
            {
                name: "Add Employee",
                value: "ADD_EMPLOYEE",
            },
            {
                name: "Update Employee Role",
                value: "UPDATE_EMPLOYEE_ROLE",
            },
            {
                name: "View All Roles",
                value: "VIEW_ROLES",
            },
            {
                name: "View All Departments",
                value: "VIEW_DEPARTMENTS",
            },
            {
                name: "Quit",
                value: "QUIT",
            },

        ],
        },

    ]).then((res)=> {
        let answer = res.choice;
        switch(answer) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            case "VIEW_ROLES":
                viewRoles();
            case "VIEW_DEPARTMENTS":
            viewDepartments();
            break;
            default:
                quit();
            
        }

    });

    }

    function viewEmployees(){
        console.log("I am viewing my subjects");
    }
    function addEmployee(){
        console.log("adding employee");
    }
    function updateEmployeeRole(){
        console.log("updating employee role");
    }
    function viewRoles(){
        console.log("viewing roles");
    }
    function viewDepartments(){
        console.log("viewing Departments");
    }
    function quit(){
        console.log("All to Easy");
    }

