import { useState as usarEstado } from 'react'
import { clienteSupabase } from './supabase'

function PantallaAcceso({
  irARegistro,
  irARecuperacion
}: {
  irARegistro: () => void
  irARecuperacion: () => void
}) {
  const [correo, cambiarCorreo] = usarEstado('')
  const [contrasena, cambiarContrasena] = usarEstado('')

  async function iniciarSesion() {
    if (correo.trim() === '' || contrasena === '') {
      alert('Por favor, ingresa tu correo y contraseña.')
      return
    }

    try {
      const { error } = await clienteSupabase.auth.signInWithPassword({
        email: correo.trim(),
        password: contrasena
      })

      if (error) {
        alert('No se pudo iniciar sesión. Revisa tus datos y confirma tu correo.')
        return
      }

      alert('¡Inicio de sesión correcto!')
      cambiarContrasena('')
    } catch {
      alert('No se pudo conectar con Supabase.')
    }
  }

  return (
    <main className="pantalla-acceso">
      <section>
        <h1>Mi Escuela Virtual</h1>
        <h2>Iniciar sesión</h2>

        <p>Bienvenido a tu preparación UNAM.</p>

        <form>
          <label htmlFor="correoAcceso">
            Correo electrónico:
          </label>
          
          <input
            id="correoAcceso"
            type="email"
            placeholder="Escribe tu correo"
            value={correo}
            onChange={(evento) => cambiarCorreo(evento.target.value)}
            autoComplete="username"
          />

          <label htmlFor="contrasenaAcceso">
            Contraseña:
          </label>

          <input
            id="contrasenaAcceso"
            type="password"
            placeholder="Escribe tu contraseña"
            value={contrasena}
            onChange={(evento) => cambiarContrasena(evento.target.value)}
            autoComplete="current-password"
          />
          <button type="button" onClick={iniciarSesion}>
            Iniciar sesión
          </button>
        </form>        
        <p>
        <button type="button" onClick={irARecuperacion}>
            ¿Olvidaste tu contraseña?
        </button>
        </p>
        <p>
        ¿No tienes cuenta?{' '}
        <button type="button" onClick={irARegistro}>
            Regístrate
        </button>
        </p>

      </section>
    </main>
  )
}

export default PantallaAcceso
