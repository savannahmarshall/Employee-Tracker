const express = require('express');
const { getRoles, addRole } = require('../../models/role');
const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await getRoles();
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { title, salary, department_id } = req.body;
  const { rows } = await addRole(title, salary, department_id);
  res.json(rows[0]);
});

module.exports = router;