DROP DATABASE IF EXISTS employee_managment_db;

CREATE DATABASE employee_managment_db;

USE employee_managment_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(8,2) NULL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);