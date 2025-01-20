// Inicializar Firebase desde CDN
const database = window.firebaseDatabase;

// Funciones existentes
function mostrarFormulario(tipo) {
    document.getElementById('registroSesion').classList.add('hidden');
    document.getElementById(`formulario${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`).classList.remove('hidden');
}

function volverInicio() {
    document.querySelectorAll('.container').forEach(el => el.classList.add('hidden'));
    document.getElementById('registroSesion').classList.remove('hidden');
}

// Función para registrar usuario
document.getElementById('formRegistro').onsubmit = function(e) {
    e.preventDefault();
    const usuario = document.getElementById('usuarioRegistro').value;
    const password = document.getElementById('passwordRegistro').value;
    set(ref(database, 'usuarios/' + usuario), {
        password: password
    }).then(() => {
        alert('Registro exitoso');
        volverInicio();
    }).catch((error) => {
        console.error('Error al registrar usuario:', error);
    });
};

// Función para iniciar sesión
document.getElementById('formLogin').onsubmit = function(e) {
    e.preventDefault();
    const usuarioLogin = document.getElementById('usuarioLogin').value;
    const passwordLogin = document.getElementById('passwordLogin').value;
    const dbRef = ref(database);
    get(child(dbRef, `usuarios/${usuarioLogin}`)).then((snapshot) => {
        if (snapshot.exists() && snapshot.val().password === passwordLogin) {
            alert('Inicio de sesión exitoso');
            document.querySelectorAll('.container').forEach(el => el.classList.add('hidden'));
            document.getElementById('menuPrincipal').classList.remove('hidden');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    }).catch((error) => {
        console.error('Error al iniciar sesión:', error);
    });
};

function mostrarAsistencia() {
    document.getElementById('menuPrincipal').classList.add('hidden');
    document.getElementById('paginaAsistencia').classList.remove('hidden');
    cargarAsignaturasYAnio();
}

function mostrarControlAsistencia() {
    document.getElementById('menuPrincipal').classList.add('hidden');
    document.getElementById('gestionAsignaturas').classList.remove('hidden');
    cargarAsignaturas();
}

function mostrarEstadisticas() {
    document.getElementById('menuPrincipal').classList.add('hidden');
    document.getElementById('paginaEstadisticas').classList.remove('hidden');
    cargarAsignaturasYAnioEstadisticas();
}

function agregarFila() {
    const tabla = document.getElementById('tablaEstudiantes');
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td><input type="text" name="estudiante[]" placeholder="Nombre del Estudiante"></td>
        <td><input type="checkbox" name="presente[]"></td>
        <td><input type="checkbox" name="ausente[]"></td>
        <td><input type="checkbox" name="justificado[]"></td>
    `;
    tabla.appendChild(nuevaFila);
}

function guardarAsistencia() {
    const estudiantes = Array.from(document.querySelectorAll('#tablaEstudiantes tr'));
    const asistencia = estudiantes.map(fila => {
        const estudiante = fila.querySelector('input[name="estudiante[]"]').value;
        const presente = fila.querySelector('input[name="presente[]"]').checked;
        const ausente = fila.querySelector('input[name="ausente[]"]').checked;
        const justificado = fila.querySelector('input[name="justificado[]"]').checked;
        return { estudiante, presente, ausente, justificado };
    });

    const datos = {
        fecha: document.getElementById('fecha').value,
        asignatura: document.getElementById('asignaturaSelect').value,
        anio: document.getElementById('anioSelect').value,
        asistencia
    };

    localStorage.setItem('asistencia', JSON.stringify(datos));
    alert('Asistencia guardada correctamente en localStorage.');
}

function cargarAsignaturas() {
    const lista = JSON.parse(localStorage.getItem('asignaturas')) || [];
    const listaUl = document.getElementById('listaAsignaturas');
    listaUl.innerHTML = '';

    lista.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.asignatura} - Año ${item.anio}`;
        listaUl.appendChild(li);
    });
}

function cargarAsignaturasYAnio() {
    const lista = JSON.parse(localStorage.getItem('asignaturas')) || [];
    const asignaturaSelect = document.getElementById('asignaturaSelect');
    const anioSelect = document.getElementById('anioSelect');

    asignaturaSelect.innerHTML = '<option value="" disabled selected>Selecciona una asignatura</option>';
    anioSelect.innerHTML = '<option value="" disabled selected>Selecciona un año</option>';

    lista.forEach(item => {
        const asignaturaOption = document.createElement('option');
        asignaturaOption.value = item.asignatura;
        asignaturaOption.textContent = item.asignatura;
        asignaturaSelect.appendChild(asignaturaOption);

        const anioOption = document.createElement('option');
        anioOption.value = item.anio;
        anioOption.textContent = item.anio;
        anioSelect.appendChild(anioOption);
    });
}

function cargarAsignaturasYAnioEstadisticas() {
    const lista = JSON.parse(localStorage.getItem('asignaturas')) || [];
    const asignaturaSelect = document.getElementById('estadisticaAsignatura');
    const anioSelect = document.getElementById('estadisticaAnio');

    asignaturaSelect.innerHTML = '<option value="" disabled selected>Selecciona una asignatura</option>';
    anioSelect.innerHTML = '<option value="" disabled selected>Selecciona un año</option>';

    lista.forEach(item => {
        const asignaturaOption = document.createElement('option');
        asignaturaOption.value = item.asignatura;
        asignaturaOption.textContent = item.asignatura;
        asignaturaSelect.appendChild(asignaturaOption);

        const anioOption = document.createElement('option');
        anioOption.value = item.anio;
        anioOption.textContent = item.anio;
        anioSelect.appendChild(anioOption);
    });
}

function volverMenu() {
    document.querySelectorAll('.container').forEach(el => el.classList.add('hidden'));
    document.getElementById('menuPrincipal').classList.remove('hidden');
}
