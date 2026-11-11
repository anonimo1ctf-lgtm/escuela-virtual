function PantallaAcceso({
  irARegistro,
  irARecuperacion
}: {
  irARegistro: () => void
  irARecuperacion: () => void
}) {
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
          />

          <label htmlFor="contrasenaAcceso">
            Contraseña:
          </label>

          <input
            id="contrasenaAcceso"
            type="password"
            placeholder="Escribe tu contraseña"
          />

          <button type="button">
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
