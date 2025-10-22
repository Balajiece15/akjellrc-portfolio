// Environment variables configuration

export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL || 'sqlite:./dev.db',
    provider: process.env.DATABASE_PROVIDER || 'sqlite' // 'sqlite' | 'vercel-kv' | 'supabase' | 'firebase'
  },
  
  // Vercel KV (if using)
  kv: {
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN
  },
  
  // Supabase (if using)
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  },
  
  // Firebase (if using)
  firebase: {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  },
  
  // Site configuration
  site: {
    name: 'AkjellRC',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://akjellrc.com',
    description: 'RC Car enthusiast portfolio showcasing Speed Run Garage and Basher Fleet collections'
  },
  
  // YouTube API (if needed for advanced features)
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY
  }
}

export default config