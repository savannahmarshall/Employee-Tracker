-- Insert departments
INSERT INTO department (name) VALUES 
('Human Resources'),
('Engineering'),
('Marketing'),
('Sales'),
('Finance');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('HR Manager', 60000, 1),  -- 1 corresponds to 'Human Resources'
('Software Engineer', 80000, 2),  -- 2 corresponds to 'Engineering'
('Marketing Specialist', 50000, 3),  -- 3 corresponds to 'Marketing'
('Sales Representative', 45000, 4),  -- 4 corresponds to 'Sales'
('Financial Analyst', 70000, 5);  -- 5 corresponds to 'Finance'

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),  -- HR Manager, no manager
('Jane', 'Smith', 2, 1),  -- Software Engineer, reports to John Doe
('Mike', 'Johnson', 3, NULL),  -- Marketing Specialist, no manager
('Emily', 'Davis', 4, NULL),  -- Sales Representative, no manager
('Anna', 'Brown', 5, NULL);  -- Financial Analyst, no manager

