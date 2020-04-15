DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

-- Create DATABASE for employee
USE employeeDB;

CREATE TABLE employees (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NULL,
last_name VARCHAR(30) NULL,
role_id INT NOT NULL,
manager INT NULL
);

SELECT * from employees;

-- CREATE DATABASE for department
USE employeeDB;

CREATE TABLE department (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
department VARCHAR(30) NULL)

-- CREATE DATABASE FOR role
USE employeeDB;

CREATE TABLE role (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NULL,
salary DECIMAL(10,2) NULL,
department INT NOT NULL)


SELECT * 
FROM employeedb.employees as x 
Join employeedb.role as y 
Join employeedb.department as z 
Join employeedb.employees as w 
ON x.role_id = y.id 
AND y.department = z.id
AND w.manager= x.id

-- delete a row
SELECT * FROM employeedb.role;
DELETE FROM role
WHERE id = 5;