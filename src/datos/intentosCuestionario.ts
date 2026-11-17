
/* Estructura de un intento de cuestionario */

export type IntentoCuestionario = {
  id: string
  cuestionarioId: string
  respuestas: Record<string, string>
  fechaEnvio: string
}
