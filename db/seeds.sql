-- Departments 
INSERT INTO department (id, department_name) VALUES (1, 'Accounting');
INSERT INTO department (id, department_name) VALUES (2, 'Human_Resources');
INSERT INTO department (id, department_name) VALUES (3, 'Web Dev');
INSERT INTO department (id, department_name) VALUES (4, 'Sales');

-- Roles

-- accounting
INSERT INTO roles (id, department_id, title, salary) VALUES (13, 1, 'Payroll', 39000);

-- Human resources
INSERT INTO roles (id, department_id, title, salary) VALUES (31, 2, 'Recruiter', 50000);

-- DEVS
INSERT INTO roles (id, department_id, title, salary) VALUES (42, 3, 'Front-End', 70000);
INSERT INTO roles (id, department_id, title, salary) VALUES (43, 3, 'Engineer', 90000);
INSERT INTO roles (id, department_id, title, salary) VALUES (44, 3, 'Back-End', 75000);

-- Sales
INSERT INTO roles (id, department_id, title, salary) VALUES (51, 4, 'Outside-Sales', 60000);
INSERT INTO roles (id, department_id, title, salary) VALUES (52, 4, 'Inside-Sales', 50000);

-- Employees
INSERT INTO employee (id, first_name, last_name, role_id, department_id, manager_id) 
    VALUES (29, 'Vinnie', 'Lopez', 43, 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, department_id, manager_id) 
    VALUES (30, 'Wilson', 'Lam', 51, 4, null);
