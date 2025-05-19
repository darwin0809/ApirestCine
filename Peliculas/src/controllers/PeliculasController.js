const { Router } = require('express');
const router = Router();
const Peliculas = require('../models/peliculasModel');

router.get('/', async (req, res) => {
    const result = await Peliculas.traerPeliculas();
    res.json(result);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Peliculas.traerPelicula(id);
    res.json(result[0]);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const activo = req.body.activo;

    const result = await Peliculas.actualizarPelicula(id, activo);
    res.send("película actualizada");
});

router.post('/', async (req, res) => {
    const { nombre, sinopsis, duracionMin, clasificacion, posterUrl, idioma, formato, activo } = req.body;

    const result = await Peliculas.crearPelicula(
        nombre,
        sinopsis,
        duracionMin,
        clasificacion,
        posterUrl,
        idioma,
        formato,
        activo
    );
    res.send("película creada");
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Peliculas.borrarPelicula(id);
    res.send("película borrada");
});

module.exports = router;
