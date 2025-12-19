import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_DB_URL
const anon_key = import.meta.env.VITE_ANON_KEY
const supabaseClient = createClient(url,anon_key)

export default supabaseClient