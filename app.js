// app.js
const express = require('express');
const bodyParser = require('body-parser');
const playlistRoutes = require('./routes/playlistRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/playlist', playlistRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
