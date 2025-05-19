const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ticketsdb',
  port: 3306
});

async function crearTicket(idUsuario, idFuncion, idSala, asientos, total) {
  const asientosStr = asientos.join(',');
  const [result] = await connection.query(
    'INSERT INTO tickets (idUsuario, idFuncion, idSala, asientos, total) VALUES (?, ?, ?, ?, ?)',
    [idUsuario, idFuncion, idSala, asientosStr, total]
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

module.exports = {
  crearTicket,
  obtenerTicketsPorUsuario
};
