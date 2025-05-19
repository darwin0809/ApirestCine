const express = require('express');
const morgan = require('morgan');
const asientosController = require('./controllers/asientosController');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/', asientosController);

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Microservicio de Asientos corriendo en el puerto ${PORT}`);
});
