'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const customer = require('./customer');
// const order = require('./order');
// const Collection = require('./collection');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;


//see class demo code for how to use both postregs and sequilize 
const sequelize = new Sequelize(DATABASE_URL);

// Import the models
const FoodModel = require('./food');
const ClothesModel = require('./clothes');

// Initialize the models
const Food = FoodModel(sequelize, DataTypes); //lowercase 
const Clothes = ClothesModel(sequelize, DataTypes);

//connecting database


module.exports = {
  Food,
  Clothes,
  sequelize,
};

