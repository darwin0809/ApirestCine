const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'peliculasdb',
  port: 3307
});

async function traerPeliculas() {
  const result = await connection.query('SELECT * FROM peliculas');
  return result[0];
}

async function traerPelicula(id) {
  const result = await connection.query('SELECT * FROM peliculas WHERE id = ?', [id]);
  return result[0];
}

async function actualizarPelicula(id, activo) {
  const result = await connection.query('UPDATE peliculas SET activo = ? WHERE id = ?', [activo, id]);
  return result;
}

async function crearPelicula(nombre, sinopsis, duracionMin, clasificacion, posterUrl, idioma, formato, activo) {
  const result = await connection.query(
    'INSERT INTO peliculas (nombre, sinopsis, duracionMin, clasificacion, posterUrl, idioma, formato, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, sinopsis, duracionMin, clasificacion, posterUrl, idioma, formato, activo]
  );
  return result;
}

async function borrarPelicula(id) {
  const result = await connection.query('DELETE FROM peliculas WHERE id = ?', [id]);
  return result;
}

// 
module.exports = {
  traerPeliculas,
  traerPelicula,
  actualizarPelicula,
  crearPelicula,
  borrarPelicula
};
