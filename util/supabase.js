import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';

// Initialize Supabase URL and key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Basic client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server client function with proper error handling
export async function createServerSupabaseClient() {
  try {
    const cookieStore = await cookies(); // Get cookies from request

    // Create the Supabase client with session cookies
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => {
          cookieStore.set({ name, value, ...options });
        },
        remove: (name, options) => {
          cookieStore.delete({ name, ...(options || {}) });
        },
      },
    });

    return supabase;
  } catch (error) {
    console.error("Error creating Supabase client:", error);
    return createClient(supabaseUrl, supabaseAnonKey); // Return fallback client
  }
}