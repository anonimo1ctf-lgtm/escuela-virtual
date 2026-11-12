import { useState as usarEstado } from 'react'
import { clienteSupabase } from './supabase'


function PantallaRegistro({ irAAcceso }: { irAAcceso: () => void }) {
  const [nombre, cambiarNombre] = usarEstado('')
  const [correo, cambiarCorreo] = usarEstado('')
  const [areaSeleccionada, cambiarAreaSeleccionada] = usarEstado('')
  const [contrasena, cambiarContrasena] = usarEstado('')


async function validarRegistro() {
  if (
    nombre.trim() === '' ||
    correo.trim() === '' ||
    contrasena === '' ||
    areaSeleccionada === ''
  ) {
    alert('Por favor, completa todos los campos.')
    return
  }

  const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!formatoCorreo.test(correo.trim())) {
    alert('Introduce un correo electrónico válido.')
    return
  }

  if (contrasena.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres.')
    return
  }


  const { error } = await clienteSupabase.auth.signUp({
    email: correo.trim(),
    password: contrasena,
    options: {
      data: {
        nombre_completo: nombre.trim(),
        area_unam: areaSeleccionada
      }
    }
  })

if (error) {
  alert('No se pudo completar el registro: ' + error.message)
  return
}

alert(
  'Solicitud de registro recibida. Revisa tu correo para confirmar tu cuenta.'
)

}


  return (
    <main className="pantalla-registro">
      <section>
        <h1>Mi Escuela Virtual</h1>
        <h2>Crear cuenta</h2>

        <p>Regístrate para comenzar tu preparación UNAM.</p>

        <form>
          <label htmlFor="nombreRegistro">
            Nombre completo:
          </label>
          <input
            id="nombreRegistro"
            type="text"
            placeholder="Escribe tu nombre"
            value={nombre}
            onChange={(evento) => cambiarNombre(evento.target.value)}
          />
          <p>Nombre capturado: {nombre}</p>
          <label htmlFor="correoRegistro">
            Correo electrónico:
          </label>
          <input
            id="correoRegistro"
            type="email"
            placeholder="Escribe tu correo"
            value={correo}
            onChange={(evento) => cambiarCorreo(evento.target.value)}
          />

<p>Correo capturado: {correo}</p>


          <label htmlFor="contrasenaRegistro">
            Contraseña:
          </label>
          <input
            id="contrasenaRegistro"
            type="password"
            placeholder="Crea una contraseña"
            value={contrasena}
            onChange={(evento) => cambiarContrasena(evento.target.value)}
            minLength={8}
            autoComplete="new-password"
          />
          <input
            id="contrasenaRegistro"
            type="password"
            placeholder="Crea una contraseña"
            value={contrasena}
            onChange={(evento) => cambiarContrasena(evento.target.value)}
            minLength={8}
            autoComplete="new-password"
          />


          <label htmlFor="areaRegistro">
            Área UNAM:
          </label>
          <select
            id="areaRegistro"
            value={areaSeleccionada}
            onChange={(evento) => cambiarAreaSeleccionada(evento.target.value)}
          >
            <option value="" disabled>
              Selecciona tu área
            </option>
            <option value="1">Área 1 - Físico-Matemáticas</option>
            <option value="2">Área 2 - Biológicas y de la Salud</option>
            <option value="3">Área 3 - Ciencias Sociales</option>
            <option value="4">Área 4 - Humanidades y Artes</option>
          </select>
          {areaSeleccionada && (
            <p>Área UNAM seleccionada: {areaSeleccionada}</p>
          )}
        <button type="button" onClick={validarRegistro}>
          Crear cuenta
        </button>
        </form>
        <p>
        ¿Ya tienes cuenta?{' '}
        <button type="button" onClick={irAAcceso}>
            Inicia sesión
        </button>
        </p>
      </section>
    </main>
  )
}

export default PantallaRegistro
