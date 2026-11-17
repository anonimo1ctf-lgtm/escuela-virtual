
/* Estructura de las opciones de respuesta */

export type OpcionUnam = {
  id: string
  texto: string
}

/* Estructura de las preguntas */

export type PreguntaUnam = {
  id: string
  enunciado: string
  opciones: OpcionUnam[]
}

/* Estructura de los cuestionarios */

export type CuestionarioUnam = {
  id: string
  titulo: string
  preguntas: PreguntaUnam[]
}

/* Catálogo provisional de cuestionarios */


export const cuestionariosUnam: Record<
  string,
  CuestionarioUnam
> = {
  'cuestionario-prueba-1': {
    id: 'cuestionario-prueba-1',
    titulo: 'Cuestionario de prueba de Matemáticas',
    preguntas: [
      {
        id: 'pregunta-prueba-1',
        enunciado: '¿Cuánto es 2 + 3?',
        opciones: [
          { id: 'a', texto: '4' },
          { id: 'b', texto: '5' },
          { id: 'c', texto: '6' },
          { id: 'd', texto: '7' }
        ]
      }
    ]
  }
}
