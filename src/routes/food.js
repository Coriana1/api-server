const express = require('express');
// const bodyParser = require('body-parser');
const router = express.Router();
// const Food = require('../models/food');
const { food } = require('../models');

router.post('/food', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const food = await food.create({ name, description, price });
    res.status(200).send(food);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create the record' });
  }
});

// get all records
router.get('/food', async (req, res, next) => {
  let foods = await food.findAll();
  res.status(200).send(foods);
});

router.get('/food/:id', async (req, res) => {
  try {
    const food = await food.findByPk(req.params.id);
    if (food) {
      res.status(200).json(food);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the record' });
  }
});

router.put('/food/:id', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const updatedFood = await food.update({ name, description, price }, {
      where: { id: req.params.id },
      returning: true,
    });
    if (updatedFood[0] === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.status(200).json(updatedFood[1][0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the record' });
  }
});

router.delete('/food/:id', async (req, res) => {
  try {
    const deletedRowsCount = await food.destroy({ where: { id: req.params.id } });
    if (deletedRowsCount === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the record' });
  }
});

module.exports = router;