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
// app.use('/food', foodRoutes);
app.use(foodRoutes);

// Mount the clothesRoutes module-  /clothes path
// app.use('/clothes', clothesRoutes);
app.use(clothesRoutes);

app.get('/', (req, res, next) => {
  res.status(200).send('SERVER HIT');
});

app.get('/bad', (req, res, next) => {
  res.status(404).send('404 NOT FOUND');
  next('Bad Path');
});
// Handle 404 - Route not found
app.use('*',NotFoundHandler);

app.use(ErrorHandler);

// Start the server
const port = process.env.PORT || 3000;
const start = () => app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, start };