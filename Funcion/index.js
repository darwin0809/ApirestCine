const express = require('express');
const cors = require('cors');
const funcionRoutes = require('./src/funcionController');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/funciones', funcionRoutes);

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Microservicio de Función corriendo en http://localhost:${PORT}`);
});
