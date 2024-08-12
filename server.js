const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const departmentRoutes = require('./routes/api/departmentRoutes');
const roleRoutes = require('./routes/api/roleRoutes');
const employeeRoutes = require('./routes/api/employeeRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Define root route
app.get('/', (req, res) => {
  res.send('Welcome to the Employee Tracker API');
});

// Routing
app.use('/api/departments', departmentRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/employees', employeeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});