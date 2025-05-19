const API = 'http://localhost:3001';

async function cargarUsuarios() {
  const res = await fetch(`${API}/usuarios`);
  const data = await res.json();
  const contenedor = document.getElementById('usuarios');
  contenedor.innerHTML = '';
  data.forEach(usuario => {
    const div = document.createElement('div');
    div.className = 'usuario';
    div.innerHTML = `
      <strong>${usuario.nombre_completo}</strong> (${usuario.email})<br>
      Tel: ${usuario.telefono} | Dirección: ${usuario.direccion}<br>
      Rol: ${usuario.rol}<br>
      <button onclick="eliminarUsuario(${usuario.usuario_id})">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });
}

async function crearUsuario() {
  const body = {
    nombre_completo: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    password_hash: document.getElementById('password').value,
    rol: document.getElementById('rol').value,
    direccion: document.getElementById('direccion').value,
    telefono: document.getElementById('telefono').value,
  };

  console.log('Datos a enviar:', body); // Verifica que los datos son correctos

  try {
    const res = await fetch(`${API}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      throw new Error('Error al crear el usuario');
    }
    const data = await res.json();
    console.log('Usuario creado:', data); // Verifica la respuesta
    cargarUsuarios();
  } catch (error) {
    console.error('Error al crear el usuario:', error);
  }
}


async function eliminarUsuario(id) {
  await fetch(`${API}/usuarios/${id}`, { method: 'DELETE' });
  cargarUsuarios();
}

// Cargar al iniciar
window.onload = cargarUsuarios;
