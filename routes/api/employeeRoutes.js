const express = require('express');
const { getEmployees, addEmployee, updateEmployeeRole } = require('../../models/employee');
const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await getEmployees();
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { first_name, last_name, role_id, manager_id } = req.body;
  const { rows } = await addEmployee(first_name, last_name, role_id, manager_id);
  res.json(rows[0]);
});

router.put('/:id', async (req, res) => {
  const { role_id } = req.body;
  const { rows } = await updateEmployeeRole(req.params.id, role_id);
  res.json(rows[0]);
});

module.exports = router;