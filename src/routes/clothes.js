const express = require('express');
const router = express.Router();
const Clothes = require('../models/clothes');

// Create a record
router.post('/', async (req, res) => {
  try {
    const { name, size, color } = req.body;
    const clothes = await Clothes.create({ name, size, color });
    res.status(201).json(clothes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the record' });
  }
});

// Get all records
router.get('/', async (req, res) => {
  try {
    const clothes = await Clothes.findAll();
    res.status(200).json(clothes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the records' });
  }
});

// Get one record
router.get('/:id', async (req, res) => {
  try {
    const clothes = await Clothes.findByPk(req.params.id);
    if (clothes) {
      res.status(200).json(clothes);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the record' });
  }
});

// Update a record
router.put('/:id', async (req, res) => {
  try {
    const { name, size, color } = req.body;
    const updatedClothes = await Clothes.update({ name, size, color }, {
      where: { id: req.params.id },
      returning: true
    });
    if (updatedClothes[0] === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.status(200).json(updatedClothes[1][0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the record' });
  }
});

// Delete a record
router.delete('/:id', async (req, res) => {
  try {
    const deletedRowsCount = await Clothes.destroy({ where: { id: req.params.id } });
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
