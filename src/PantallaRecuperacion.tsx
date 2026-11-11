function PantallaRecuperacion({
  irAAcceso
}: {
  irAAcceso: () => void
}) {

return (
    <main className="pantalla-recuperacion">
      <section>
        <h1>Mi Escuela Virtual</h1>
        <h2>Recuperar contraseña</h2>

        <p>
          Escribe tu correo electrónico y te enviaremos
          un enlace para restablecer tu contraseña.
        </p>
        <form>
          <label htmlFor="correoRecuperacion">
            Correo electrónico:
          </label>

          <input
            id="correoRecuperacion"
            type="email"
            placeholder="Escribe tu correo"
          />
          <button type="button" disabled>
            Enviar enlace de recuperación
          </button>
        </form>
        <p>
        <button type="button" onClick={irAAcceso}>
            Volver a iniciar sesión
        </button>
        </p>
      </section>
    </main>
  )
}

export default PantallaRecuperacion
