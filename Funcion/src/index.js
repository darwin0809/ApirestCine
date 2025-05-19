const express = require('express');
const morgan = require('morgan');
const funcionController = require('./controllers/funcionController');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(funcionController);

app.listen(3004, () => {
  console.log('Microservicio FUNCION corriendo en puerto 3004');
});
