const express = require('express');
const router = express.Router();
const asientosModel = require('../models/asientosModel');

router.get('/asientos', async (req, res) => {
  const result = await asientosModel.traerAsientos();
  res.json(result);
});

router.get('/asientos/:id', async (req, res) => {
  const result = await asientosModel.traerAsiento(req.params.id);
  result.length ? res.json(result[0]) : res.status(404).send('Asiento no encontrado');
});

router.get('/asientos-sala/:sala', async (req, res) => {
  const result = await asientosModel.traerAsientosPorSala(req.params.sala);
  res.json(result);
});

router.put('/asientos/:id/estado', async (req, res) => {
  const { estado } = req.body;
  if (estado !== 'ocupado' && estado !== 'desocupado') return res.status(400).send('Estado inválido');
  await asientosModel.actualizarEstado(req.params.id, estado);
  res.send('Estado actualizado');
});

router.put('/asientos/:id/tipo', async (req, res) => {
  const { tipo } = req.body;
  if (tipo !== 'normal' && tipo !== 'preferencial') return res.status(400).send('Tipo inválido');
  await asientosModel.actualizarTipo(req.params.id, tipo);
  res.send('Tipo y precio actualizados');
});

router.put('/asientos-reiniciar', async (req, res) => {
  await asientosModel.reiniciarAsientos();
  res.send("Todos los asientos reiniciados a 'desocupado'");
});

module.exports = router;
