const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ticketsdb',
  port: 3306
});

async function crearTicket(idUsuario, idFuncion, asientos, total) {
  const asientosStr = Array.isArray(asientos) ? asientos.join(',') : asientos;
  const [result] = await connection.query(
    'INSERT INTO tickets (idUsuario, idFuncion, asientos, total) VALUES (?, ?, ?, ?)',
    [idUsuario, idFuncion, asientosStr, total]
  );
  return result;
}

async function obtenerTicketsPorUsuario(idUsuario) {
  const [result] = await connection.query(
    'SELECT * FROM tickets WHERE idUsuario = ? ORDER BY fechaCompra DESC',
    [idUsuario]
  );
  return result;
}

async function eliminarTicket(id) {
  const [result] = await connection.query('DELETE FROM tickets WHERE idTicket = ?', [id]);
  return result;
}

async function obtenerTicketPorId(id) {
  const [result] = await connection.query('SELECT * FROM tickets WHERE idTicket = ?', [id]);
  return result[0];
}

module.exports = {
  crearTicket,
  obtenerTicketsPorUsuario,
  eliminarTicket,
  obtenerTicketPorId
};
