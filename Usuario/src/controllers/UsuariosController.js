const { Router } = require('express');
const router = Router();
const usuariosModel = require('../models/usuariosModel');

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const result = await usuariosModel.traerUsuarios();
    res.json(result);
  } catch (err) {
    res.status(500).send("Error al traer los usuarios");
  }
});

// Obtener un usuario por ID
router.get('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await usuariosModel.traerUsuario(id);
    res.json(result[0]);
  } catch (err) {
    res.status(500).send("Error al traer el usuario");
  }
});

// Crear un nuevo usuario
router.post('/usuarios', async (req, res) => {
  const {
    nombre_completo,
    email,
    password_hash,
    rol,
    direccion,
    telefono
  } = req.body;

  try {
    await usuariosModel.crearUsuario(nombre_completo, email, password_hash, rol, direccion, telefono);
    res.json({ mensaje: "Usuario creado" });
  } catch (err) {
    res.status(500).send("Error al crear el usuario");
  }
});

// Actualizar un usuario (por ejemplo, su dirección y teléfono)
router.put('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  const { direccion, telefono } = req.body;

  try {
    await usuariosModel.actualizarUsuario(id, direccion, telefono);
    res.send("Usuario actualizado");
  } catch (err) {
    res.status(500).send("Error al actualizar el usuario");
  }
});

// Eliminar un usuario
router.delete('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await usuariosModel.borrarUsuario(id);
    res.send("Usuario eliminado");
  } catch (err) {
    res.status(500).send("Error al eliminar el usuario");
  }
});

module.exports = router;
