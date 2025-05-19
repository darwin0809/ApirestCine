const express = require('express');
const cors = require('cors');
const ticketRoutes = require('./src/ticketController');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tickets', ticketRoutes);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Microservicio de Ticket corriendo en http://localhost:${PORT}`);
});
