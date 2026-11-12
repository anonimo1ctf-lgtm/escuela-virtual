
import { createClient as crearCliente } from '@supabase/supabase-js'

// Obtener los datos de conexion
const direccionSupabase = import.meta.env.VITE_SUPABASE_URL

const clavePublica = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Crear el cliente de Supabase
export const clienteSupabase = crearCliente(
  direccionSupabase,
  clavePublica
)
