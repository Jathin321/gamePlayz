import { supabase } from "./supabase";

// Simple in-memory cache to hold session for 10 minutes
let cachedSession = null;
let cacheTimestamp = 0;

// Utility function to fetch session with caching
export async function getSession() {
  const currentTime = Date.now();

  // Check if cache is still valid (10 minutes)
  if (cachedSession && (currentTime - cacheTimestamp) < 10 * 60 * 1000) {
    return cachedSession; // Return cached session if it's still valid
  }

  // If no cached session or cache has expired, fetch the session from Supabase
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.log("Error fetching session:", error);
    return null;
  }
  console.log("From getSession : ",session?.user);

  // Cache the session and store the timestamp
  cachedSession = session?.user || null;
  cacheTimestamp = currentTime;

  return cachedSession;
}
