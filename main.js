const keyUsuarios = 'usuarios'

// Datos de usuarios (ejemplo)
let usuarios = [];

try {
    usuarios = JSON.parse(localStorage.getItem(keyUsuarios)) ?? []
} catch {
    localStorage.removeItem(keyUsuarios)
    usuarios = []
}

// Obtener elementos del DOM
const loginForm = document.getElementById('login-form');
const registroForm = document.getElementById('registro-form');
const usuariosTable = document.getElementById('usuarios-table');
const listarButton = document.getElementById('listar-button');

const registrarUsario = (usuario) => {
    usuarios = [...usuarios, usuario]
    localStorage.setItem(keyUsuarios, JSON.stringify(usuarios))
}

// Manejar el evento de inicio de sesión
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Realizar validaciones de inicio de sesión aquí

    // Ejemplo: Comprobar si el usuario existe en la lista de usuarios registrados
    const usuarioExistente = usuarios.find((usuario) => usuario.usuario === username && usuario.contrasena === password);

    if (usuarioExistente) {
        alert('Inicio de sesión exitoso.');
        window.location = 'index.html';
    } else {
        alert('Credenciales incorrectas.');
    }
});

// Manejar el evento de registro
registroForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const cedula = document.getElementById('cedula').value;
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    // Realizar validaciones de registro aquí

    // Ejemplo: Comprobar si la cédula ya está registrada
    const cedulaExistente = usuarios.find((usuario) => usuario.cedula === cedula);

    if (cedulaExistente) {
        alert('La cédula ya está registrada.');
    } else {
        // Agregar el nuevo usuario a la lista
        registrarUsario({ nombre, apellido, cedula, usuario, contrasena });

        // Limpiar el formulario
        registroForm.reset();

        alert('Registro exitoso.');
    }
});

// Manejar el evento de listar usuarios
listarButton?.addEventListener('click', () => {
    // Mostrar la lista de usuarios en la tabla
    const tbody = usuariosTable.querySelector('tbody');
    tbody.innerHTML = '';

    usuarios.forEach((usuario) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.nombre ?? ''}</td>
            <td>${usuario.apellido ?? ''}</td>
            <td>${usuario.cedula ?? ''}</td>
            <td>${usuario.usuario ?? ''}</td>
            <td>${usuario.contrasena?? ''}</td>
        `;
        tbody.appendChild(row);
    });
});
