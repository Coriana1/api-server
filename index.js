'use strict';

require ('dotenv').config();

const { sequelize } = require('./src/models');
const { start } = require('./src/server');

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    start (PORT);
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });



