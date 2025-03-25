"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/util/supabase";

export async function login(email, password) {
  if (!email || !password) {
    return { error: "Both email and password are required." };
  }

  try {
    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Set HTTP-only cookie for session management
    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth_session",
      value: data.session.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Store user ID in a separate cookie
    cookieStore.set({
      name: "user_details",
      value: JSON.stringify({
        user: {
          id: data.user.id,
          email: data.user.email,
          // Include other needed user properties
        },
      }),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true, user: data.user };
  } catch (error) {
    console.error("Login error:", error);
    return { error: error.message || "Invalid login credentials." };
  }
}

export async function logout() {
  try {
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Clear all auth cookies
    const cookieStore = await cookies();

    // Clear auth session
    cookieStore.delete({
      name: "auth_session",
      path: "/",
    });

    // Clear user ID cookie
    cookieStore.delete({
      name: "user_id",
      path: "/",
    });

    // Clear any existing user details
    if (cookieStore.has("user_details")) {
      cookieStore.delete("user_details");
    }

    // Redirect to home page
    redirect("/");

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { error: error.message };
  }
}

export async function getAuthToken() {
  try {
    // First try to get token from HTTP-only cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_session")?.value;

    if (token) {
      return token;
    }

    // Fall back to Supabase session if cookie isn't available
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;

    return data?.session?.access_token || null;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
}

export async function getUserEmail() {
  try {
    // First try to get data from HTTP-only cookie
    const cookieStore = await cookies();
    const userDetailsCookie = cookieStore.get("user_details")?.value;
    
    if (userDetailsCookie) {
      try {
        const userData = JSON.parse(userDetailsCookie);
        if (userData.user && userData.user.email) {
          return { success: true, email: userData.user.email };
        }
      } catch (e) {
        console.log("Error parsing user_details cookie:", e);
      }
    }
    
    // Fall back to Supabase if cookie isn't available or valid
    const { data, error } = await supabase.auth.getUser();

    if (!error && data?.user) {
      return { success: true, email: data.user.email };
    }
    
    return { success: false, error: "User not found" };
  } catch (error) {
    console.error("Error getting user email:", error);
    return { success: false, error: error.message };
  }
}

export async function getUserId() {
  try {
    // Try to get user ID from HTTP-only user_details cookie
    const cookieStore = await cookies();
    const userDetailsCookie = cookieStore.get("user_details")?.value;
    
    if (userDetailsCookie) {
      try {
        const userData = JSON.parse(userDetailsCookie);
        if (userData.user && userData.user.id) {
          return { success: true, userId: userData.user.id };
        }
      } catch (e) {
        console.error("Error parsing user_details cookie:", e);
      }
    }
    
    // Fall back to Supabase if cookie isn't available or valid
    const { data, error } = await supabase.auth.getUser();
    
    if (!error && data?.user) {
      return { success: true, userId: data.user.id };
    }
    
    return { success: false, error: "User not found" };
  } catch (error) {
    console.error("Error getting user ID:", error);
    return { success: false, error: error.message };
  }
}
