const path = require('path');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.port || 3000;

const express = require('express'); // webserver

var app = express();
app.use(express.static(publicPath));



app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
