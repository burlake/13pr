const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000} = process.env;

const app = express();

app.listen(PORT, () => {
  console.log ('есть порт 3000')
});