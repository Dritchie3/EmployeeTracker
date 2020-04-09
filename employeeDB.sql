DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

-- Create DATABASE for employee
USE employeeDB;

CREATE TABLE employees (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
role_id INT NULL,
manager VARCHAR(100) NULL
);

SELECT * from employees;

-- CREATE DATABASE for department
USE employeeDB;

CREATE TABLE department (
id INT PRIMARY KEY NOT NULL,
department VARCHAR(30) NULL)

-- CREATE DATABASE FOR role
USE employeeDB;

CREATE TABLE role (
id INT PRIMARY KEY NOT NULL,
role_id INT NULL,
salary DECIMAL(10,2) NULL,
department VARCHAR(30) NULL)