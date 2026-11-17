
export type LeccionUnam = {
  id: string
  titulo: string
  contenido: string
}

/* Estructura de los temas */


export type TemaUnam = {
  id: string
  nombre: string
  lecciones: LeccionUnam[]
  cuestionarioId?: string
}


/* Estructura de las unidades */

export type UnidadUnam = {
  id: string
  nombre: string
  temas: TemaUnam[]
}

/* Temarios organizados por área y materia */

export const temariosPorArea: Record<
  string,
  Record<string, UnidadUnam[]>
> = {
    '1': {
    'Matemáticas': [
        {
        id: 'unidad-prueba-1',
        nombre: 'Unidad de prueba',
        temas: [
            {
            id: 'tema-prueba-1',
            nombre: 'Tema de prueba',
            cuestionarioId: 'cuestionario-prueba-1',

            lecciones: [
                {
                id: 'leccion-prueba-1',
                titulo: 'Mi primera lección',
                contenido: 'Bienvenido a tu primera lección de la Escuela Virtual. Aquí aprenderás los conceptos del tema y podrás practicar con ejercicios.'
                }
            ]
            }
        ]
        }
    ],
    'Física': []
    },


  '2': {
    'Matemáticas': [],
    'Biología': []
  },

  '3': {
    'Matemáticas': [],
    'Historia': []
  },

  '4': {
    'Matemáticas': [],
    'Filosofía': []
  }
}
