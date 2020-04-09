DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employees (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
role_id INT NULL,
department VARCHAR(30) NULL,
salary DECIMAL(10,2) NULL,
manager VARCHAR(100) NULL
);

SELECT * from employees;
