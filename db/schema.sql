DROP DATABASE IF EXISTS company_employees;

CREATE DATABASE company_employees;

USE company_employees;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    CONSTRAINT fk_role FOREIGN KEY (department_id) REFERENCES employee(id) ON department SET NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    CONSTRAINT fk_employee_role FOREIGN KEY (role_id) REFERENCES role(department_id) ON department SET NULL
    CONSTRAINT fk_management_role FOREIGN KEY (manager_id) REFERENCES employee(id) ON employee SET NULL
);