const express = require('express');
const router = express.Router();
const funcionModel = require('./funcionModel');

// Crear función
router.post('/', async (req, res) => {
  const { idPelicula, sala, fecha, hora } = req.body;
  if (!idPelicula || !sala || !fecha || !hora) {
    return res.status(400).json({ mensaje: 'Datos incompletos' });
  }
  try {
    await funcionModel.crearFuncion(idPelicula, sala, fecha, hora);
    res.status(201).json({ mensaje: 'Función creada con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear función' });
  }
});

// Obtener función por ID
router.get('/:id', async (req, res) => {
  try {
    const funcion = await funcionModel.traerFuncion(req.params.id);
    if (!funcion) return res.status(404).json({ mensaje: 'Función no encontrada' });
    res.json(funcion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener función' });
  }
});

// Obtener todas las funciones
router.get('/', async (req, res) => {
  try {
    const funciones = await funcionModel.traerFunciones();
    res.json(funciones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener funciones' });
  }
});

// Actualizar función
router.put('/:id', async (req, res) => {
  try {
    await funcionModel.actualizarFuncion(req.params.id, req.body);
    res.json({ mensaje: 'Función actualizada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al actualizar función' });
  }
});

// Eliminar función
router.delete('/:id', async (req, res) => {
  try {
    await funcionModel.eliminarFuncion(req.params.id);
    res.json({ mensaje: 'Función eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al eliminar función' });
  }
});

module.exports = router;
