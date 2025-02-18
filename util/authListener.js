"use client";

import { supabase } from "./supabase";

// Utility function to listen to authentication state changes
export function onAuthStateChange(callback) {
  if (typeof callback !== "function") {
    console.error("onAuthStateChange: callback is not a function");
    return () => {}; // Return a dummy cleanup function
  }

  // Listen for authentication state changes
  const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null); // Call the callback with user or null if not logged in
  });

  // Return cleanup function to unsubscribe from the auth listener
  return () => {
    authListener?.subscription?.unsubscribe(); // Unsubscribe to prevent memory leaks
  };
}
