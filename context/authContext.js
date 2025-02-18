"use client";  // Ensures it runs only on the client side

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/util/supabase";
import { redirect } from "next/navigation";

// Create Auth Context
const AuthContext = createContext(null);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (initial session)
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      setLoading(false);
    };

    checkUserSession();

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    // Cleanup function to unsubscribe
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Function to login a user
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  // Function to logout a user
  const logout = async () => {
    await supabase.auth.signOut();
    redirect('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
