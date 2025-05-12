const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'funcionesms'
});

async function getFunciones() {
    const [rows] = await db.query('SELECT * FROM funcion');
    return rows;
}

async function getFuncionById(id) {
    const [rows] = await db.query('SELECT * FROM funcion WHERE funcion_id = ?', [id]);
    return rows;
}

async function createFuncion(pelicula_id, sala_id, fecha_hora, estado) {
    const [result] = await db.query(
        'INSERT INTO funcion (pelicula_id, sala_id, fecha_hora, estado) VALUES (?, ?, ?, ?)',
        [pelicula_id, sala_id, fecha_hora, estado]
    );
    return result;
}

async function updateFuncion(id, fecha_hora, estado) {
    const [result] = await db.query(
        'UPDATE funcion SET fecha_hora = ?, estado = ? WHERE funcion_id = ?',
        [fecha_hora, estado, id]
    );
    return result;
}

async function deleteFuncion(id) {
    const [result] = await db.query('DELETE FROM funcion WHERE funcion_id = ?', [id]);
    return result;
}

module.exports = {
    getFunciones,
    getFuncionById,
    createFuncion,
    updateFuncion,
    deleteFuncion
};
