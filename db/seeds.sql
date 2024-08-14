-- Insert departments
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Marketing');

-- Insert roles 
INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 80000, 1),  
  ('Marketing Specialist', 60000, 2);  

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),  
  ('Jane', 'Smith', 2, NULL);  