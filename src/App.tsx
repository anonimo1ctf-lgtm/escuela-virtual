import './App.css'
import {
  useState as usarEstado,
  useEffect as usarEfecto
} from 'react'

import PantallaAcceso from './PantallaAcceso'
import PantallaRegistro from './PantallaRegistro'
import PantallaRecuperacion from './PantallaRecuperacion'
import PanelEstudiante from './PanelEstudiante'
import { clienteSupabase } from './supabase'

function Aplicacion() {
  const [pantallaActual, cambiarPantallaActual] = usarEstado('acceso')

  const [sesionIniciada, cambiarSesionIniciada] =
    usarEstado<boolean | null>(null)

  usarEfecto(() => {
    const { data: { subscription } } =
      clienteSupabase.auth.onAuthStateChange(
        (_evento, sesion) => {
          cambiarSesionIniciada(sesion !== null)
        }
      )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  function irARegistro() {
    cambiarPantallaActual('registro')
  }

  function irAAcceso() {
    cambiarPantallaActual('acceso')
  }

  function irARecuperacion() {
    cambiarPantallaActual('recuperacion')
  }

  if (sesionIniciada === null) {
    return <p>Comprobando sesión...</p>
  }

  if (sesionIniciada) {
    return <PanelEstudiante />
  }

  return (
    <>
      {pantallaActual === 'acceso' && (
        <PantallaAcceso
          irARegistro={irARegistro}
          irARecuperacion={irARecuperacion}
        />
      )}

      {pantallaActual === 'registro' && (
        <PantallaRegistro irAAcceso={irAAcceso} />
      )}

      {pantallaActual === 'recuperacion' && (
        <PantallaRecuperacion irAAcceso={irAAcceso} />
      )}
    </>
  )
}

export default Aplicacion
