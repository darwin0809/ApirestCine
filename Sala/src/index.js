console.log("Inicio del archivo index.js");
const express = require('express');
const productosController = require('./controllers/productosController.js');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(productosController);

app.listen(3010, () => {
  console.log('backProductos ejecutandose en el puerto 3010');
});
