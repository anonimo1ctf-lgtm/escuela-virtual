
import type { LeccionCompletada } from './datos/progresoLecciones'
import type { IntentoCuestionario } from './datos/intentosCuestionario'
import { temariosPorArea } from './datos/temariosUnam'
import { materiasPorArea } from './datos/materiasUnam'
import {
  useState as usarEstado,
  useEffect as usarEfecto
} from 'react'

import { clienteSupabase } from './supabase'
import { cuestionariosUnam } from './datos/cuestionariosUnam'



const nombresAreas: Record<string, string> = {
  '1': 'Ciencias Físico-Matemáticas y de las Ingenierías',
  '2': 'Ciencias Biológicas, Químicas y de la Salud',
  '3': 'Ciencias Sociales',
  '4': 'Humanidades y de las Artes'
}

function Aplicacion() {
  const [mensaje, cambiarMensaje] = usarEstado('')
  const [mostrarMaterias, cambiarMostrarMaterias] = usarEstado(false)
  const [materiaSeleccionada, cambiarMateriaSeleccionada] = usarEstado('')
  const [leccionAbierta, cambiarLeccionAbierta] = usarEstado<string | null>(null)
  const [leccionesCompletadas, cambiarLeccionesCompletadas] = usarEstado<LeccionCompletada[]>([])

  const [respuestasSeleccionadas, cambiarRespuestasSeleccionadas] = usarEstado<Record<string, string>>({})
  const [cuestionariosEnviados, cambiarCuestionariosEnviados] = usarEstado<Record<string, boolean>>({})
  const [intentosRegistrados, cambiarIntentosRegistrados] = usarEstado<IntentoCuestionario[]>([])



  
  function comenzarEstudio() {
    cambiarMensaje('¡Vamos a comenzar tu preparación UNAM!')
  }

  function alternarMaterias() {
    cambiarMostrarMaterias(!mostrarMaterias)
  }
  function seleccionarMateria(materia: string) {
    cambiarMateriaSeleccionada(materia)
  }


  async function cerrarSesion() {
    const { error } = await clienteSupabase.auth.signOut()

    if (error) {
      alert('No se pudo cerrar la sesión.')
      return
    }
  }

  const [nombreEstudiante, cambiarNombreEstudiante] =
    usarEstado('Estudiante')

  const [areaEstudiante, cambiarAreaEstudiante] =
    usarEstado('Sin área asignada')

  usarEfecto(() => {
    async function cargarDatosEstudiante() {
      const { data: { user }, error } =
        await clienteSupabase.auth.getUser()

      if (error || !user) {
        return
      }

      const datos = user.user_metadata

      if (typeof datos.nombre_completo === 'string') {
        cambiarNombreEstudiante(datos.nombre_completo)
      }

      if (typeof datos.area_unam === 'string') {
        cambiarAreaEstudiante(datos.area_unam)
      }
    }

    cargarDatosEstudiante()
  }, [])

  usarEfecto(() => {
    async function cargarIntentos() {
      const { data, error } = await clienteSupabase
        .from('intentos_cuestionario')
        .select(
          'id, cuestionario_id, respuestas, fecha_envio'
        )
        .order('fecha_envio', { ascending: true })

      if (error) {
        console.error(
          'Error al recuperar los intentos:',
          error
        )
        return
      }

      const intentosRecuperados: IntentoCuestionario[] =
        (data ?? []).map((registro) => ({
          id: registro.id,
          cuestionarioId: registro.cuestionario_id,
          respuestas: registro.respuestas as Record<string, string>,
          fechaEnvio: registro.fecha_envio
        }))

      cambiarIntentosRegistrados(intentosRecuperados)
    }

    void cargarIntentos()
  }, [])

  usarEfecto(() => {
    async function cargarLeccionesCompletadas() {
      const { data, error } = await clienteSupabase
        .from('lecciones_completadas')
        .select('leccion_id, fecha_finalizacion')

      if (error) {
        console.error(
          'Error al recuperar lecciones:',
          error
        )
        return
      }

      const leccionesRecuperadas: LeccionCompletada[] =
        (data ?? []).map((registro) => ({
          leccionId: registro.leccion_id,
          fechaFinalizacion: registro.fecha_finalizacion
        }))

      cambiarLeccionesCompletadas(leccionesRecuperadas)
    }

    void cargarLeccionesCompletadas()
  }, [])


  const materias = materiasPorArea[areaEstudiante] ?? []
  const unidadesMateria = temariosPorArea[areaEstudiante]?.[materiaSeleccionada] ?? []

  const unidadesDelArea = Object.values(
    temariosPorArea[areaEstudiante] ?? {}
  ).flat()

  const leccionesDelArea = unidadesDelArea.flatMap(
    (unidad) =>
      unidad.temas.flatMap(
        (tema) => tema.lecciones
      )
  )

  const totalLecciones = leccionesDelArea.length

  const leccionesTerminadas = leccionesDelArea.filter(
    (leccion) =>
      leccionesCompletadas.some(
        (registro) => registro.leccionId === leccion.id
      )
  ).length

  const porcentajeProgreso = totalLecciones === 0
    ? 0
    : Math.round(
        (leccionesTerminadas / totalLecciones) * 100
      )

  function calcularProgresoMateria(nombreMateria: string) {
    const unidades =
      temariosPorArea[areaEstudiante]?.[nombreMateria] ?? []

    const lecciones = unidades.flatMap(
      (unidad) =>
        unidad.temas.flatMap(
          (tema) => tema.lecciones
        )
    )

    const total = lecciones.length

    const completadas = lecciones.filter(
      (leccion) =>
        leccionesCompletadas.some(
          (registro) => registro.leccionId === leccion.id
        )
    ).length

    const porcentaje = total === 0
      ? 0
      : Math.round((completadas / total) * 100)

    return { total, completadas, porcentaje }
  }

  return (
    <div>
      <header>
        <h1>Escuela Virtual</h1>
        <p>Tu camino hacia la UNAM comienza aquí</p>
        <h2>¡Bienvenido, {nombreEstudiante}!</h2>        
        <p>
          Área UNAM: {nombresAreas[areaEstudiante]
            ? `${areaEstudiante} — ${nombresAreas[areaEstudiante]}`
            : 'Sin área asignada'}
        </p>


        <button type="button" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </header>

      <main>
        <h2>Panel del estudiante</h2>
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
            <div className="detalle-materia">
              <h3>{materiaSeleccionada}</h3>


              {unidadesMateria.length === 0 ? (
                <p>
                  El temario de esta materia todavía
                  no está cargado.
                </p>
              ) : (
                <ul>
                  {unidadesMateria.map((unidad) => (
                    <li key={unidad.id}>
                      <strong>{unidad.nombre}</strong>

                      <ul>
                        {unidad.temas.map((tema) => (
                          <li key={tema.id}>
                            {tema.nombre}

                            <ul>
                              {tema.lecciones.map((leccion) => (
                                <li key={leccion.id}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      cambiarLeccionAbierta(
                                        leccionAbierta === leccion.id
                                          ? null
                                          : leccion.id
                                      )
                                    }
                                  >
                                    {leccion.titulo}
                                  </button>
                                  
                                  {leccionAbierta === leccion.id && (
                                    <div>
                                      <p>{leccion.contenido}</p>

                                      <button
                                        type="button"
                                        disabled={leccionesCompletadas.some(
                                          (registro) => registro.leccionId === leccion.id
                                        )}

                                        onClick={async () => {
                                          const { error } = await clienteSupabase
                                            .from('lecciones_completadas')
                                            .insert({
                                              leccion_id: leccion.id
                                            })

                                          if (error) {
                                            console.error('Error al completar la lección:', error)
                                            alert('No se pudo guardar el progreso.')
                                            return
                                          }

                                          cambiarLeccionesCompletadas(
                                            (anteriores) => {
                                              if (anteriores.some(
                                                (registro) => registro.leccionId === leccion.id
                                              )) {
                                                return anteriores
                                              }

                                              return [
                                                ...anteriores,
                                                {
                                                  leccionId: leccion.id,
                                                  fechaFinalizacion: new Date().toISOString()
                                                }
                                              ]
                                            }
                                          )
                                        }}

                                      >
                                        {leccionesCompletadas.some(
                                          (registro) => registro.leccionId === leccion.id
                                        )
                                          ? '✓ Lección completada'
                                          : 'Marcar como completada'}
                                      </button>
                                    </div>
                                  )}

                                </li>
                              ))}
                            </ul>
                            {tema.cuestionarioId &&
                              cuestionariosUnam[tema.cuestionarioId] && (
                                <div className="cuestionario-tema">
                                  <h4>
                                    {cuestionariosUnam[tema.cuestionarioId].titulo}
                                  </h4>

                                  {cuestionariosUnam[tema.cuestionarioId].preguntas.map(
                                    (pregunta) => (
                                      <div key={pregunta.id}>
                                        <p>{pregunta.enunciado}</p>
                                        <ul>
                                        {pregunta.opciones.map((opcion) => (
                                          <li key={opcion.id}>
                                            <label>
                                              <input
                                                type="radio"
                                                name={`pregunta-${pregunta.id}`}
                                                value={opcion.id}
                                                checked={
                                                  respuestasSeleccionadas[pregunta.id] === opcion.id
                                                }
                                                onChange={() => {
                                                  cambiarRespuestasSeleccionadas(
                                                    (respuestasAnteriores) => ({
                                                      ...respuestasAnteriores,
                                                      [pregunta.id]: opcion.id
                                                    })
                                                  )

                                                  cambiarCuestionariosEnviados(
                                                    (cuestionariosAnteriores) => ({
                                                      ...cuestionariosAnteriores,
                                                      [tema.cuestionarioId ?? '']: false
                                                    })
                                                  )
                                                }}
                                              />
                                              {opcion.id.toUpperCase()}) {opcion.texto}
                                            </label>
                                          </li>
                                        ))}
                                        </ul>
                                      </div>
                                    )
                                  )}
                                  <button
                                    type="button"                                    
                                    onClick={async () => {
                                      const preguntas =
                                        cuestionariosUnam[tema.cuestionarioId ?? '']
                                          ?.preguntas ?? []

                                      const faltanRespuestas = preguntas.some(
                                        (pregunta) =>
                                          !respuestasSeleccionadas[pregunta.id]
                                      )

                                      if (faltanRespuestas) {
                                        alert('Debes responder todas las preguntas.')
                                        return
                                      }                                      
                                      if (cuestionariosEnviados[tema.cuestionarioId ?? '']) {
                                        return
                                      }

                                      const respuestasDelIntento: Record<string, string> = {}

                                      preguntas.forEach((pregunta) => {
                                        respuestasDelIntento[pregunta.id] =
                                          respuestasSeleccionadas[pregunta.id]
                                      })

                                      const nuevoIntento: IntentoCuestionario = {
                                        id: crypto.randomUUID(),
                                        cuestionarioId: tema.cuestionarioId ?? '',
                                        respuestas: respuestasDelIntento,
                                        fechaEnvio: new Date().toISOString()
                                      }

                                      const { error: errorGuardado } =
                                        await clienteSupabase
                                          .from('intentos_cuestionario')
                                          .insert({
                                            cuestionario_id: nuevoIntento.cuestionarioId,
                                            respuestas: nuevoIntento.respuestas
                                          })

                                      if (errorGuardado) {
                                        console.error('Error al guardar:', errorGuardado)

                                        alert(
                                          'No se pudo guardar el intento en Supabase.'
                                        )

                                        return
                                      }

                                      cambiarIntentosRegistrados(
                                        (intentosAnteriores) => [
                                          ...intentosAnteriores,
                                          nuevoIntento
                                        ]
                                      )

                                      cambiarCuestionariosEnviados(
                                        (cuestionariosAnteriores) => ({
                                          ...cuestionariosAnteriores,
                                          [tema.cuestionarioId ?? '']: true
                                        })
                                      )

                                    }}
                                  >
                                    Enviar respuestas
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const preguntas =
                                        cuestionariosUnam[tema.cuestionarioId ?? '']
                                          ?.preguntas ?? []

                                      cambiarRespuestasSeleccionadas(
                                        (respuestasAnteriores) => {
                                          const nuevasRespuestas = {
                                            ...respuestasAnteriores
                                          }

                                          preguntas.forEach((pregunta) => {
                                            delete nuevasRespuestas[pregunta.id]
                                          })

                                          return nuevasRespuestas
                                        }
                                      )

                                      cambiarCuestionariosEnviados(
                                        (cuestionariosAnteriores) => ({
                                          ...cuestionariosAnteriores,
                                          [tema.cuestionarioId ?? '']: false
                                        })
                                      )
                                    }}
                                  >
                                    Reiniciar cuestionario
                                  </button>
                                  {cuestionariosEnviados[tema.cuestionarioId ?? ''] && (
                                    <p className="mensaje-cuestionario">
                                      ✅ ¡Respuestas enviadas correctamente!

                                      Este cuestionario todavía no tiene
                                      calificación automática.
                                    </p>
                                  )}

                                  <p>
                                    Intentos registrados: {
                                      intentosRegistrados.filter(
                                        (intento) =>
                                          intento.cuestionarioId === tema.cuestionarioId
                                      ).length
                                    }
                                  </p>
                                  <div className="historial-intentos">
                                    <h4>Historial de intentos</h4>

                                    <ol>
                                      {intentosRegistrados
                                        .filter(
                                          (intento) =>
                                            intento.cuestionarioId === tema.cuestionarioId
                                        )
                                        .map((intento, indice) => (
                                          <li key={intento.id}>
                                            Intento {indice + 1}

                                            <p>
                                              Fecha: {
                                                new Date(intento.fechaEnvio)
                                                  .toLocaleString('es-MX')
                                              }
                                            </p>

                                            <p>
                                              Preguntas respondidas: {
                                                Object.keys(intento.respuestas).length
                                              }
                                            </p>
                                          </li>
                                        ))}
                                    </ol>
                                  </div>


                                </div>
                              )}
                          </li>
                        ))}

                      </ul>
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={() => {
                  cambiarLeccionAbierta(null)
                  cambiarMateriaSeleccionada('')
                }}
              >
                Volver a materias
              </button>
            </div>
          )}

        </section>
        <section>
          <h3>Mis simuladores</h3>
          <p>Practica con exámenes de opción múltiple.</p>
        </section>

        <section>
          <h3>Mi progreso</h3>


        <div className="resumen-progreso">
          <div className="tarjeta-indicador">
            <span>Intentos realizados</span>

            <strong>{intentosRegistrados.length}</strong>
          </div>

          <div className="tarjeta-indicador">
            <span>Cuestionarios diferentes</span>

            <strong>
              {new Set(
                intentosRegistrados.map(
                  (intento) => intento.cuestionarioId
                )
              ).size}
            </strong>
          </div>
        </div>

          <h4>Progreso de lecciones</h4>

          <p>
            Lecciones completadas: {leccionesTerminadas}
            {' '}de {totalLecciones}
          </p>

          <progress
            value={leccionesTerminadas}
            max={totalLecciones || 1}
            style={{ width: '100%' }}
          />

          <p>{porcentajeProgreso}% completado</p>

          <h4>Progreso por materia</h4>

          {materias.map((materia) => {
            const progreso = calcularProgresoMateria(materia)

            return (
              <div 
                key={materia}
                className="tarjeta-progreso-materia"
                >

                <h5>{materia}</h5>

                {progreso.total === 0 ? (
                  <p>Todavía no hay lecciones cargadas.</p>
                ) : (
                  <>
                    <p>
                      {progreso.completadas} de {progreso.total}
                      {' '}lecciones completadas
                    </p>

                    <progress
                      value={progreso.completadas}
                      max={progreso.total}
                      style={{ width: '100%' }}
                    />

                    <p>{progreso.porcentaje}% completado</p>
                  </>
                )}
              </div>
            )
          })}




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
