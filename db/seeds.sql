INSERT INTO department (names)
VALUES
  ('Sales'),('Engineering'),
  ('Finance'),('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);

INSERT INTO employee (id,first_name, last_name, roles_id, manager_id)
VALUES
  (1,'John', 'Doe', 1,1),
  (2,'Mike', 'Chan', 1,1),
  (3,'Ashley', 'Rodriguez',2,3),
  (4,'Kevin', 'Tupik',2,3),
  (5,'Nalia', 'Brown',3,5),
  (6,'Sarah', 'Lourd',4,6),
  (7,'Tom', 'Allen',4,6);