function PantallaRegistro({ irAAcceso }: { irAAcceso: () => void }) {
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
          />

          <label htmlFor="correoRegistro">
            Correo electrónico:
          </label>
          <input
            id="correoRegistro"
            type="email"
            placeholder="Escribe tu correo"
          />

          <label htmlFor="contrasenaRegistro">
            Contraseña:
          </label>
          <input
            id="contrasenaRegistro"
            type="password"
            placeholder="Crea una contraseña"
          />

          <label htmlFor="areaRegistro">
            Área UNAM:
          </label>
          <select id="areaRegistro" defaultValue="">
            <option value="" disabled>
              Selecciona tu área
            </option>
            <option value="1">Área 1 - Físico-Matemáticas</option>
            <option value="2">Área 2 - Biológicas y de la Salud</option>
            <option value="3">Área 3 - Ciencias Sociales</option>
            <option value="4">Área 4 - Humanidades y Artes</option>
          </select>

          <button type="button">
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
