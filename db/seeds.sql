USE employee_db;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1), ('Salesperson', 80000, 1), ('Lead Engineer', 150000, 2), ('Software Engineer', 120000, 2), ('Accountant', 125000, 3), ('Legal Team Lead', 250000, 4), ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Erik ', 'Feaster', 1, null), ('Carolyn', 'Hall', 3, null), ('Chris', 'Smith', 4, 2), ('Devorah', 'Lee', 6, null), ('Johnny', 'Bench', 2, 1), ('Jenette', 'Williams', 2, 1);
