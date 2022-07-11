require('dotenv').config();
const express = require('express');
const main = require('./bot');
const app = express();
const PORT = process.env.PORT || 3000;

// Run the bot every 10 seconds
setInterval(() => {
  main();
}, 10000);

app.get('/', (req, res) => {
  res.send('<h1>working...</h1>');
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
