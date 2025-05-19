const express = require('express');
const router = express.Router();
const ticketModel = require('./ticketModel');

// Simulación de funciones (hasta que tengas el micro de Función completo)
const funcionesMock = {
  1: { sala: 'S1', peliculaId: 2, fecha: '2025-05-20', hora: '19:00' },
};

const asientosOcupados = []; // Simulación de ocupación de asientos

// Crear un ticket
router.post('/crear', async (req, res) => {
  const { idUsuario, idFuncion, asientos, total } = req.body;

  const funcion = funcionesMock[idFuncion];
  if (!funcion) return res.status(404).json({ mensaje: 'Función no encontrada' });

  const ocupados = asientos.filter(a => asientosOcupados.includes(`${funcion.sala}${a}`));
  if (ocupados.length > 0) {
    return res.status(400).json({ mensaje: `Asientos ya ocupados: ${ocupados.join(', ')}` });
  }

  try {
    await ticketModel.crearTicket(idUsuario, idFuncion, funcion.sala, asientos, total);
    asientos.forEach(a => asientosOcupados.push(`${funcion.sala}${a}`));
    res.status(201).json({ mensaje: 'Ticket creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el ticket' });
  }
});

// Obtener historial por usuario
router.get('/usuario/:id', async (req, res) => {
  const idUsuario = req.params.id;
  try {
    const tickets = await ticketModel.obtenerTicketsPorUsuario(idUsuario);
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener tickets' });
  }
});

module.exports = router;
