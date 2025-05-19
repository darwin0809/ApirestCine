const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'asientos2'
});

async function traerAsientos() {
  const [rows] = await connection.query('SELECT * FROM asientos2');
  return rows;
}

async function traerAsiento(id) {
  const [rows] = await connection.query('SELECT * FROM asientos2 WHERE id = ?', [id]);
  return rows;
}

async function traerAsientosPorSala(sala) {
  const [rows] = await connection.query('SELECT * FROM asientos2 WHERE sala = ?', [sala]);
  return rows;
}

async function actualizarEstado(id, estado) {
  return connection.query('UPDATE asientos2 SET estado = ? WHERE id = ?', [estado, id]);
}

async function actualizarTipo(id, tipo) {
  const precio = tipo === 'preferencial' ? 12000 : 8000;
  return connection.query('UPDATE asientos2 SET tipo = ?, precio = ? WHERE id = ?', [tipo, precio, id]);
}

async function reiniciarAsientos() {
  return connection.query('UPDATE asientos2 SET estado = "desocupado"');
}

module.exports = {
  traerAsientos,
  traerAsiento,
  traerAsientosPorSala,
  actualizarEstado,
  actualizarTipo,
  reiniciarAsientos
};
