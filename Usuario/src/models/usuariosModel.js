const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'UsuariosCine'
});

async function traerUsuarios() {
  const result = await connection.query('SELECT * FROM usuarios');
  return result[0];
}

async function traerUsuario(id) {
  const result = await connection.query('SELECT * FROM usuarios WHERE usuario_id = ?', [id]);
  return result[0];
}

async function crearUsuario(nombre_completo, email, password_hash, rol, direccion, telefono) {
  const query = `
    INSERT INTO usuarios 
    (nombre_completo, email, password_hash, rol, direccion, telefono) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const result = await connection.query(query, [nombre_completo, email, password_hash, rol, direccion, telefono]);
  return result;
}

async function actualizarUsuario(id, direccion, telefono) {
  const query = `
    UPDATE usuarios 
    SET direccion = ?, telefono = ? 
    WHERE usuario_id = ?
  `;
  const result = await connection.query(query, [direccion, telefono, id]);
  return result;
}

async function borrarUsuario(id) {
  const result = await connection.query('DELETE FROM usuarios WHERE usuario_id = ?', [id]);
  return result;
}

module.exports = {
  traerUsuarios,
  traerUsuario,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario
};
