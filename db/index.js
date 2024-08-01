const pool = require('./connection');

class DB {
    constructor() {}
    async query(sql,args=[]){
        const client = await pool.connect();
        try {
            const result = await client.query(sql,args);
            return result;
        } finally{
            client.release();
        }
    }

    viewEmployees(){
        return this.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id  LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;");
    }
    viewRoles(){
        return this.query("SELECT roles.id, roles.title, department.department_name AS department, roles.salary FROM roles LEFT JOIN department ON department_id = department.id;");
    }
    viewDepartments(){
        return this.query("SELECT department.id, department.department_name AS department FROM department;");
    }
    
    
}
module.exports = new DB();