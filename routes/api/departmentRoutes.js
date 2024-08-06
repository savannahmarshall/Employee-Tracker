const express = require('express');
const { getDepartments, addDepartment } = require('../../models/department');
const router = express.Router();

router.get('/', async (req, res) => {
  const { rows } = await getDepartments();
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const { rows } = await addDepartment(name);
  res.json(rows[0]);
});

module.exports = router;