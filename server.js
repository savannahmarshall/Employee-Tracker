const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const departmentRoutes = require('./routes/departments');
const roleRoutes = require('./routes/roles');
const employeeRoutes = require('./routes/employees');

// Middleware to parse JSON bodies
app.use(express.json());

// Routing
app.use('/api/departments', departmentRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/employees', employeeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});