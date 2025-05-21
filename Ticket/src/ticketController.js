const express = require('express');
const router = express.Router();
const ticketModel = require('./ticketModel');
const axios = require('axios');
const mysql = require('mysql2/promise');

// Conexión a la base de datos de asientos
const asientosDB = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'asientos2',
  port: 3306
});

// Obtener información real de una función desde su microservicio
async function obtenerFuncion(idFuncion) {
  try {
    const response = await axios.get(`http://localhost:3004/funciones/${idFuncion}`);
    return response.data;
  } catch (err) {
    console.error(`Error al obtener la función ${idFuncion}:`, err.message);
    return null;
  }
}

// Calcular total sumando los precios desde la base de datos de asientos
async function calcularTotal(asientos) {
  const ids = asientos.map(a => `'${a}'`).join(',');
  const [rows] = await asientosDB.query(`SELECT precio FROM asientos2 WHERE id IN (${ids})`);
  return rows.reduce((sum, row) => sum + row.precio, 0);
}

// Verificar qué asientos están ocupados
async function verificarDisponibilidad(asientos) {
  const ids = asientos.map(a => `'${a}'`).join(',');
  const [rows] = await asientosDB.query(`SELECT id, estado FROM asientos2 WHERE id IN (${ids})`);
  return rows.filter(row => row.estado === 'ocupado').map(r => r.id);
}

// Actualizar estado de asientos a "ocupado"
async function ocuparAsientos(asientos) {
  const ids = asientos.map(a => `'${a}'`).join(',');
  await asientosDB.query(`UPDATE asientos2 SET estado = 'ocupado' WHERE id IN (${ids})`);
}

// Ruta para crear un ticket
router.post('/crear', async (req, res) => {
  const { idUsuario, idFuncion, asientos } = req.body;

  if (!idUsuario || !idFuncion || !asientos || !asientos.length) {
    return res.status(400).json({ mensaje: 'Datos incompletos' });
  }

  const funcion = await obtenerFuncion(idFuncion);
  if (!funcion) return res.status(404).json({ mensaje: 'Función no encontrada' });

  const pelicula = await obtenerPelicula(funcion.idPelicula);
  if (!pelicula) return res.status(404).json({ mensaje: 'Película no encontrada' });

  try {
    const ocupados = await verificarDisponibilidad(asientos);
    if (ocupados.length > 0) {
      return res.status(400).json({ mensaje: `Asientos ocupados: ${ocupados.join(', ')}` });
    }

    const total = await calcularTotal(asientos);
    await ticketModel.crearTicket(idUsuario, idFuncion, asientos, total);
    await ocuparAsientos(asientos);

    const qrContenido = `Ticket | Película: ${pelicula.nombre} | Sala: ${funcion.sala} | Fecha: ${funcion.fecha} | Hora: ${funcion.hora} | Asientos: ${asientos.join(', ')}`;

    res.status(201).json({
      mensaje: 'Ticket creado con éxito',
      total,
      funcion,
      pelicula,
      qrContenido
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear el ticket' });
  }
});

// Ruta para obtener el historial de tickets por usuario
router.get('/usuario/:id', async (req, res) => {
  try {
    const tickets = await ticketModel.obtenerTicketsPorUsuario(req.params.id);

    const ticketsDetallados = await Promise.all(tickets.map(async (ticket) => {
      const funcion = await obtenerFuncion(ticket.idFuncion);
      const pelicula = funcion ? await obtenerPelicula(funcion.idPelicula) : null;

      return {
        ...ticket,
        funcion,
        pelicula
      };
    }));

    res.json(ticketsDetallados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener historial completo de tickets' });
  }
});


// Eliminar ticket por ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Obtener ticket para saber qué asientos estaban ocupados
    const ticket = await ticketModel.obtenerTicketPorId(id);
    if (!ticket) return res.status(404).json({ mensaje: 'Ticket no encontrado' });

    const asientos = ticket.asientos.split(',');

    // Liberar asientos
    const ids = asientos.map(a => `'${a}'`).join(',');
    await asientosDB.query(`UPDATE asientos2 SET estado = 'desocupado' WHERE id IN (${ids})`);

    // Eliminar ticket
    await ticketModel.eliminarTicket(id);

    res.json({ mensaje: `Ticket con ID ${id} eliminado y asientos liberados.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al eliminar el ticket y liberar asientos' });
  }
});

async function obtenerPelicula(idPelicula) {
  try {
    const response = await axios.get(`http://localhost:3002/peliculas/${idPelicula}`);
    return response.data;
  } catch (err) {
    console.error(`Error al obtener la película ${idPelicula}:`, err.message);
    return null;
  }
}

module.exports = router;
