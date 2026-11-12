
import { useState as usarEstado } from 'react'

function Aplicacion() {
  const [mensaje, cambiarMensaje] = usarEstado('')
  const [mostrarMaterias, cambiarMostrarMaterias] = usarEstado(false)
  const [materiaSeleccionada, cambiarMateriaSeleccionada] = usarEstado('')
  const [areaSeleccionada, cambiarAreaSeleccionada] = usarEstado('')


  
  const materias = [
    'Matemáticas',
    'Español',
    'Física',
    'Química',
    'Biología',
    'Historia de México',
    'Historia Universal',
    'Filosofia',
    'Literatura',
    'Geografía'
  ]

  function comenzarEstudio() {
    cambiarMensaje('¡Vamos a comenzar tu preparación UNAM!')
  }

  function alternarMaterias() {
    cambiarMostrarMaterias(!mostrarMaterias)
  }
  function seleccionarMateria(materia: string) {
    cambiarMateriaSeleccionada(materia)
  }
  return (
    <div>
      <header>
        <h1>Escuela Virtual</h1>
        <p>Tu camino hacia la UNAM comienza aquí</p>
      </header>

      <main>
        <h2>Panel del estudiante</h2>
        <section>
          <h3>Registro de estudiante</h3>

          <p>Crea tu cuenta para comenzar tu preparación UNAM.</p>

          <form>
            <label htmlFor="nombre">Nombre completo:</label>
            <input
              id="nombre"
              type="text"
              placeholder="Escribe tu nombre"
            />

            <label htmlFor="correo">Correo electrónico:</label>
            <input
              id="correo"
              type="email"
              placeholder="ejemplo@correo.com"
            />

            <label htmlFor="contrasena">Contraseña:</label>
            <input
              id="contrasena"
              type="password"
              placeholder="Escribe tu contraseña"
            />

            <label htmlFor="areaRegistro">Área UNAM:</label>
            <select id="areaRegistro" defaultValue="">
              <option value="" disabled>
                Selecciona tu área
              </option>
              <option value="1">Área 1 - Físico-Matemáticas</option>
              <option value="2">Área 2 - Biológicas y de la Salud</option>
              <option value="3">Área 3 - Ciencias Sociales</option>
              <option value="4">Área 4 - Humanidades y Artes</option>
            </select>
            <button
              type="button"
              onClick={() => alert('El registro estará disponible próximamente.')}
            >
              Crear cuenta
            </button>
          </form>
        </section>

        <section>
          <h3>Selecciona tu área UNAM</h3>

          <select
            value={areaSeleccionada}
            onChange={(evento) => cambiarAreaSeleccionada(evento.target.value)}
          >
            <option value="">Selecciona un área</option>
            <option value="1">Área 1 - Ciencias Físico-Matemáticas</option>
            <option value="2">Área 2 - Ciencias Biológicas y de la Salud</option>
            <option value="3">Área 3 - Ciencias Sociales</option>
            <option value="4">Área 4 - Humanidades y Artes</option>
          </select>

          {areaSeleccionada && (
            <p>Has seleccionado el Área {areaSeleccionada}</p>
          )}
        </section>

        <section>
          <h3>Mis materias</h3>
          <p>Consulta tus clases y materiales de estudio.</p>
          <button onClick={alternarMaterias}>
            {mostrarMaterias ? 'Ocultar materias' : 'Ver materias'}
          </button>
          {mostrarMaterias && (
            <ul>
              {materias.map((materia) => (
                <li key={materia}>
                  <button onClick={() => seleccionarMateria(materia)}>
                    {materia}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {materiaSeleccionada && (
            <p>
              Has seleccionado: {materiaSeleccionada}
            </p>
          )}
        </section>
        <section>
          <h3>Mis simuladores</h3>
          <p>Practica con exámenes de opción múltiple.</p>
        </section>

        <section>
          <h3>Mi progreso</h3>
          <p>Consulta tus resultados y avances académicos.</p>
        </section>

        <button onClick={comenzarEstudio}>
          Comenzar a estudiar
        </button>

        {mensaje && <p>{mensaje}</p>}
      </main>
    </div>
  )
}

export default Aplicacion
