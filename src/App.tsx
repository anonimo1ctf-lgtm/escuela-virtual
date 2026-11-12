import { useState as usarEstado } from 'react'

import PantallaAcceso from './PantallaAcceso'
import PantallaRegistro from './PantallaRegistro'
import PantallaRecuperacion from './PantallaRecuperacion'


function Aplicacion() {
  const [pantallaActual, cambiarPantallaActual] = usarEstado('acceso')

  function irARegistro() {
    cambiarPantallaActual('registro')
  }

function irAAcceso() {
  cambiarPantallaActual('acceso')
}

function irARecuperacion() {
  cambiarPantallaActual('recuperacion')
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
