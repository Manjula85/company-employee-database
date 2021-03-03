DROP DATABASE IF EXISTS companyEmployees;
CREATE DATABASE companyEmployees;
USE companyEmployees;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT,
    names VARCHAR(30) NOT NULL,
    PRIMARY KEY (id),
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER UNSIGNED ,
    PRIMARY KEY (id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INTEGER UNSIGNED ,
    manager_id INTEGER UNSIGNED ,
    PRIMARY KEY (id),
    CONSTRAINT fk_roles FOREIGN KEY (roles_id) REFERENCES roles(id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) 
);