
const inq = require('inquirer');  // needed for prompts
const dStarCrew = require("./db"); // database from postgres empire_db
init(); // main function
function init(){
    runPrompts();
}

function runPrompts(){  //handles running the main menu
    inq.prompt([
        {
        type: "list",  // flavored the "Company" after the deathstar crew and using Starwars quotes and flavor
        name: "choice",
        message:"What is thy Bidding my Master.",
        choices: [
            {
                name: "View All Agents",
                value: "VIEW_EMPLOYEES",
            },
                        
            {
                name: "Add Agent",
                value: "ADD_EMPLOYEE",
            },
            {
                name: "Update Agent Position",
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
        switch(answer) { //switch statement to handle answers to menu prompts
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
                break;
            case "VIEW_DEPARTMENTS":
            viewDepartments();
            break;
            default:
                quit();
            
        }

    });

    }
//        Displays table  of Employees 
    function viewEmployees(){
        console.log("Here is the Death Star's manifest.");
        dStarCrew.viewEmployees()  // runs the sql query
        .then(({rows}) => {
            let subjects = rows; //sets up the table for a nice console log
            console.log('\n');
            console.table(subjects);
        })
        .then(()=> runPrompts()); // returns to main menu
    }
    // adds a employee to the data base
    function addEmployee() {
        //sets up the prompts to get the first and last name of the employee
        inq.prompt([ 
          {
            name: "first_name",
            message: "What is the Agent's First name?",
          },
          {
            name: "last_name",
            message: "What is the Agent's Last name?",
          },
          // assigns the answers to new variables
        ]).then((res) => {
          let firstName = res.first_name;
          let lastName = res.last_name;
          //queries the roles to display as choices to assign new employee      
          dStarCrew.viewRoles().then(({ rows }) => {
            let roles = rows;
            const roleOptions = roles.map(({ id, title }) => ({
              name: title,
              value: id,
            }));
            //makes a list prompt using the above query to field the choices.
      
            inq.prompt({
              type: "list",
              name: "roleId",
              message: "What is the Agent's position?",
              choices: roleOptions,
            }).then((res) => {
              let roleId = res.roleId;
              // make a query of all employees to set up a list of choices for a manager of the new employee      
              dStarCrew.viewEmployees().then(({ rows }) => {
                let employees = rows;
                const managerOptions = employees.map(
                  ({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id,
                  })
                );
      
                managerOptions.unshift({ name: "None", value: null }); // gives an option to set the manager as Null
      //          Presents the option of managers for person to choose from
                inq.prompt({
                  type: "list",
                  name: "managerId",
                  message: "Who is the Agent's manager?",
                  choices: managerOptions,
                })
                //takes the data from the string of prompts  and puts it into an employee object
                  .then((res) => {
                    let employee = {
                      manager_id: res.managerId,
                      role_id: roleId,
                      first_name: firstName,
                      last_name: lastName,
                    };
      
                    dStarCrew.addEmployee(employee); // uses the new employee object and passes it into the add employee method of DB class
                  })
                  .then(() =>
                    console.log(`Loyal Agent ${firstName} ${lastName} has been added to the Death Star crew All hail the Emperor`) // console log letting you know the op is complete
                  )
                  .then(() => runPrompts());// loops back to the main menu.
              });
            });
          });
        });
      }
    // updates an employee role
    function updateEmployeeRole(){
        // reads the data from the employee database
        dStarCrew.viewEmployees().then(({rows})=>{
            let employees = rows;
            //maps out all the employees in the database and stores them as an array in employeeOptions
            const employeeOptions = employees.map(({id, first_name, last_name})=>({
                name: `${first_name} ${last_name}`,
                value: id,
            }));
            // selects the employee to update
            inq.prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message:"Which Agent's position do you want to change?",
                    choices: employeeOptions,
                },
                // selects roles to display in next question
            ]).then((res)=>{
                let employeeId = res.employeeId;
                dStarCrew.viewRoles().then(({rows})=>{
                    let roles = rows;
                    const roleOptions = roles.map(({id, title})=> ({
                        name: title,
                        value: id,
                    }));
                    inq.prompt([
                        {
                            type: 'list',
                            name: 'roleId',
                            message: 'What position do you want to assign the Agent ?',
                            choices: roleOptions,
                        },
                    ])
                    .then((res)=> dStarCrew.updateEmployeeRole(employeeId, res.roleId)) //uses DB method to update employee role in database
                    .then(()=> console.log("Updated Agent's Role.")) //console log letting one know the operation is complete
                    .then(()=> runPrompts());
                })
            })
        })
       
    }
    // displays a table of roles
    function viewRoles(){
        console.log("here are the positions");
        // queries the roles and then sets them up to be displayed as a table in the console
        dStarCrew.viewRoles().then(({rows})=>{
            let positions = rows;
            console.log('\n');
            console.table(positions);
        })
        .then(()=>runPrompts());// returns to the main menu.
    }
    //displays table of departments
    function viewDepartments(){
        console.log("here are the Imperial Offices"); 
        // queries the departments using the DB view departments method and displays them in a console table.
        dStarCrew.viewDepartments().then(({rows})=>{
            let departments = rows;
            console.log('\n');
            console.table(departments);
        })
        .then(()=> runPrompts());
    }
    //exits the program
    function quit(){
        console.log("All too Easy");
        process.exit();
    }

