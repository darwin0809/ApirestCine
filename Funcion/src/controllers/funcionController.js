const { Router } = require('express');
const router = Router();
const model = require('../models/funcionModel');
const axios = require('axios');

// Obtener todas
router.get('/funciones', async (req, res) => {
    const result = await model.getFunciones();
    res.json(result);
});

// Obtener una por ID
router.get('/funciones/:id', async (req, res) => {
    const result = await model.getFuncionById(req.params.id);
    res.json(result[0]);
});

// Crear función (con validación de película)
router.post('/funciones', async (req, res) => {
    const { pelicula_id, sala_id, fecha_hora, estado } = req.body;

    // Validar existencia de película en microservicio de películas
    try {
        const response = await axios.get(`http://localhost:3002/peliculas/${pelicula_id}`);
        if (!response.data || response.data.length === 0) {
            return res.status(404).send("La película no existe");
        }
    } catch (error) {
        return res.status(400).send("Error al consultar el microservicio de películas");
    }

    await model.createFuncion(pelicula_id, sala_id, fecha_hora, estado);
    res.send("Función creada");
});

// Actualizar función
router.put('/funciones/:id', async (req, res) => {
    const { fecha_hora, estado } = req.body;
    await model.updateFuncion(req.params.id, fecha_hora, estado);
    res.send("Función actualizada");
});

// Eliminar función
router.delete('/funciones/:id', async (req, res) => {
    await model.deleteFuncion(req.params.id);
    res.send("Función eliminada");
});

module.exports = router;
