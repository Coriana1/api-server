'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const foodRoutes = require('./routes/food');
const clothesRoutes = require('./routes/clothes');
const NotFoundHandler = require('./error-handlers/404');
const ErrorHandler = require('./error-handlers/500');

app.use(cors());
app.use(express.json());

// Mount the foodRoutes - /food path
app.use(foodRoutes);

// Mount the clothesRoutes module-  /clothes path
app.use('/clothes', clothesRoutes);

// Handle 404 - Route not found
app.use(NotFoundHandler);

app.use(ErrorHandler);

// Start the server
const port = process.env.PORT || 3000;
const start = () => app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, start };