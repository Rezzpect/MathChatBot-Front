declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_DB_URL: string;
      ANON_KEY: string;
      PORT?: string; //optional
    }
  }
}

export {}; 