const express = require('express');
const cors = require('cors');
const PeliculasController = require('./src/controllers/PeliculasController.js');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static('public'));

// Enrutar al controlador
app.use('/peliculas', PeliculasController); 

app.listen(3002, () => {
  console.log('backPeliculas ejecutándose en el puerto 3002');
});
