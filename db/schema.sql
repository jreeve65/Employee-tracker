DROP DATABASE IF EXISTS empire_db;
CREATE DATABASE empire_db;
\c empire_db;

CREATE TABLE department(
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES roles(id),
    manager_id INTEGER,    
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);