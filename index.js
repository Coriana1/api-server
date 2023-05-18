const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const foodRoutes = require('./src/routes/food');
const clothesRoutes = require('./src/routes/clothes');
const { NotFoundHandler, ErrorHandler } = require('./src/error-handler');

// Sequelize instance
const sequelize = new Sequelize(require('./config/config.json'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/food', foodRoutes);
app.use('/clothes', clothesRoutes);

// 404 Handler
app.use(NotFoundHandler);

// Error Handler
app.use(ErrorHandler);

// Database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    // Sync database models if needed
    // sequelize.sync();
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
