/*TO DOS =============================================
1. Import the required packages 
4 set up database schema and test queries via sql*/
const inq = require('inquirer');
const dStarCrew = require("./db");
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
        dStarCrew.viewEmployees()
        .then(({rows}) => {
            let subjects = rows;
            console.log('\n');
            console.table(subjects);
        })
        .then(()=> runPrompts());
    }
    function addEmployee() {
        inq.prompt([
          {
            name: "first_name",
            message: "What is the employee's First name?",
          },
          {
            name: "last_name",
            message: "What is the employee's Last name?",
          },
        ]).then((res) => {
          let firstName = res.first_name;
          let lastName = res.last_name;
      
          dStarCrew.viewRoles().then(({ rows }) => {
            let roles = rows;
            const roleOptions = roles.map(({ id, title }) => ({
              name: title,
              value: id,
            }));
      
            inq.prompt({
              type: "list",
              name: "roleId",
              message: "What is the employee's position?",
              choices: roleOptions,
            }).then((res) => {
              let roleId = res.roleId;
      
              dStarCrew.viewEmployees().then(({ rows }) => {
                let employees = rows;
                const managerOptions = employees.map(
                  ({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id,
                  })
                );
      
                managerOptions.unshift({ name: "None", value: null });
      
                inq.prompt({
                  type: "list",
                  name: "managerId",
                  message: "Who is the employee's manager?",
                  choices: managerOptions,
                })
                  .then((res) => {
                    let employee = {
                      manager_id: res.managerId,
                      role_id: roleId,
                      first_name: firstName,
                      last_name: lastName,
                    };
      
                    dStarCrew.addEmployee(employee);
                  })
                  .then(() =>
                    console.log(`Loyal Agent ${firstName} ${lastName} has been added to the Death Star crew All hail the Emperor`)
                  )
                  .then(() => runPrompts());
              });
            });
          });
        });
      }
    
    function updateEmployeeRole(){
        console.log("updating employee role");
    }
    function viewRoles(){
        console.log("viewing roles");
        dStarCrew.viewRoles().then(({rows})=>{
            let positions = rows;
            console.log('\n');
            console.table(positions);
        })
        .then(()=>runPrompts());
    }
    function viewDepartments(){
        console.log("viewing Departments");
        dStarCrew.viewDepartments().then(({rows})=>{
            let departments = rows;
            console.log('\n');
            console.table(departments);
        })
        .then(()=> runPrompts());
    }
    function quit(){
        console.log("All too Easy");
        process.exit();
    }

