'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const food = require('./food');
const clothes = require('./clothes');
const Collection = require('./collection');
// const customer = require('./customer');
// const order = require('./order');
// const Collection = require('./collection');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;


//see class demo code for how to use both postregs and sequilize 
const sequelize = new Sequelize(DATABASE_URL);

// Import the models
// const FoodModel = require('./food');
// const ClothesModel = require('./clothes');

// Initialize the models
const FoodModel = food(sequelize, DataTypes); //lowercase 
const ClothesModel = clothes(sequelize, DataTypes);

//code for collection
FoodModel.hasMany(ClothesModel);
ClothesModel.belongsTo(FoodModel);

//connecting database


module.exports = {
  clothes: new Collection(ClothesModel),
  food: new Collection(FoodModel),
  sequelize,
};

