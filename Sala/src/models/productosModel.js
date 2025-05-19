console.log("productosModel cargado correctamente");
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sala'
});

async function traerProductos() {
  const result = await connection.query('SELECT * FROM salas');
  return result[0];
}

async function traerProducto(idSala) {
  const result = await connection.query('SELECT * FROM salas WHERE idSala = ?', [idSala]);
  return result[0];
}

async function cambiarEstado(idSala, estado) {
  const result = await connection.query('UPDATE salas SET estado = ? WHERE idSala = ?', [estado, idSala]);
  return result;
}

async function reiniciarSalas() {
  const result = await connection.query('UPDATE salas SET estado = "disponible"');
  return result;
}

module.exports = {
  traerProductos,
  traerProducto,
  cambiarEstado,
  reiniciarSalas
};
