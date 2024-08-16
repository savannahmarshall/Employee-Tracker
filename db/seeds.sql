-- Insert departments
INSERT INTO department (name) VALUES 
('Human Resources'),
('Engineering'),
('Marketing'),
('Sales'),
('Finance');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('HR Manager', 60000, 1),  
('Software Engineer', 80000, 2), 
('Marketing Specialist', 50000, 3), 
('Sales Representative', 45000, 4),
('Financial Analyst', 70000, 5); 

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL), 
('Jane', 'Smith', 2, 1), 
('Mike', 'Johnson', 3, NULL), 
('Emily', 'Davis', 4, NULL), 
('Anna', 'Brown', 5, NULL); 

