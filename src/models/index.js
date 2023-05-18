const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

// Import the models
const FoodModel = require('./food');
const ClothesModel = require('./clothes');

// Initialize the models
const Food = FoodModel(sequelize, Sequelize);
const Clothes = ClothesModel(sequelize, Sequelize);


module.exports = {
  Food,
  Clothes,
};
