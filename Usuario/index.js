const express = require('express');
const cors = require('cors');
const UsuariosController = require('./src/controllers/UsuariosController');
const morgan = require('morgan');
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// Servir archivos estáticos
app.use(express.static('public'));
app.use(UsuariosController);
app.listen(3001, () => {
 console.log('backUsuarios ejecutandose en el puerto 3001');
});