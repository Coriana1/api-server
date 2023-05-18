const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const foodRoutes = require('./src/routes/food');
const clothesRoutes = require('./src/routes/clothes');
const NotFoundHandler = require('./src/error-handlers/404');
const ErrorHandler = require('./src/error-handlers/500');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' :process.env.DATABASE_URL;

const sequelize = new Sequelize({
  dialect: 'postgres', 
});

app.use(cors());
app.use(bodyParser.json());

app.use('/food', foodRoutes);
app.use('/clothes', clothesRoutes);

app.use(NotFoundHandler);

app.use(ErrorHandler);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});