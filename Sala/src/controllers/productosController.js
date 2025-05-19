console.log("productosController cargado correctamente");

const { Router } = require('express');
const router = Router();
const productosModel = require('../models/productosModel');

// Obtener todas las salas
router.get('/salas', async (req, res) => {
  const result = await productosModel.traerProductos();
  res.json(result);
});

// Obtener una sala por ID
router.get('/salas/:id', async (req, res) => {
  const id = req.params.id;
  const result = await productosModel.traerProducto(id);
  res.json(result[0]);
});

// Ver salas disponibles
router.get('/salas-disponibles', async (req, res) => {
  const result = await productosModel.traerProductos();
  const disponibles = result.filter(s => s.estado === 'disponible');
  res.json(disponibles);
});

// Ver salas ocupadas
router.get('/salas-ocupadas', async (req, res) => {
  const result = await productosModel.traerProductos();
  const ocupadas = result.filter(s => s.estado === 'ocupada');
  res.json(ocupadas);
});

// Cambiar estado de una sala (ocupada / disponible)
router.put('/salas/:id/estado', async (req, res) => {
  const id = req.params.id;
  const estado = req.body.estado;

  if (estado !== 'disponible' && estado !== 'ocupada') {
    return res.status(400).send("Estado inválido");
  }

  await productosModel.cambiarEstado(id, estado);
  res.send("Estado de sala actualizado");
});

// Reiniciar todas las salas a 'disponible'
router.put('/salas-reiniciar', async (req, res) => {
  await productosModel.reiniciarSalas();
  res.send("Todas las salas fueron reiniciadas a 'disponible'");
});

module.exports = router;
