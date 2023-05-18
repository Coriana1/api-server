const express = require('express');
const app = express();
const foodRoutes = require('./routes/food');
const clothesRoutes = require('./routes/clothes');

app.use(express.json());

// Mount the foodRoutes - /food path
app.use('/food', foodRoutes);

// Mount the clothesRoutes module-  /clothes path
app.use('/clothes', clothesRoutes);

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;