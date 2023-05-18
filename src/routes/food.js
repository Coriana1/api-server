const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Food = require('../models/food');

router.use(bodyParser.json());

router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const food = await Food.create({ name, description, price });
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the record' });
  }
});

router.get('/', async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the records' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findByPk(req.params.id);
    if (food) {
      res.status(200).json(food);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the record' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const updatedFood = await Food.update({ name, description, price }, {
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

router.delete('/:id', async (req, res) => {
  try {
    const deletedRowsCount = await Food.destroy({ where: { id: req.params.id } });
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