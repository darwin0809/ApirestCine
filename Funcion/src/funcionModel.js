const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'funcionesdb',
  port: 3306
});

async function crearFuncion(idPelicula, sala, fecha, hora) {
  const [result] = await db.query(
    'INSERT INTO funciones (idPelicula, sala, fecha, hora) VALUES (?, ?, ?, ?)',
    [idPelicula, sala, fecha, hora]
  );
  return result;
}

async function traerFuncion(id) {
  const [result] = await db.query('SELECT * FROM funciones WHERE idFuncion = ?', [id]);
  return result[0];
}

async function traerFunciones() {
  const [result] = await db.query('SELECT * FROM funciones');
  return result;
}

async function actualizarFuncion(id, nuevaData) {
  const { idPelicula, sala, fecha, hora } = nuevaData;
  const [result] = await db.query(
    'UPDATE funciones SET idPelicula = ?, sala = ?, fecha = ?, hora = ? WHERE idFuncion = ?',
    [idPelicula, sala, fecha, hora, id]
  );
  return result;
}

async function eliminarFuncion(id) {
  const [result] = await db.query('DELETE FROM funciones WHERE idFuncion = ?', [id]);
  return result;
}

module.exports = {
  crearFuncion,
  traerFuncion,
  traerFunciones,
  actualizarFuncion,
  eliminarFuncion
};
