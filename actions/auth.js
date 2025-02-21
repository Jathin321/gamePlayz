"use server";
import { cookies } from "next/headers";
import { supabase } from "@/util/supabase";

export async function login(email, password) {
  // Validate input
  if (!email || !password) {
    return { error: "Both email and password are required." };
  }

  // Authenticate with Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message || "Invalid login credentials." };
  }

  // Set session token in HTTP-only cookie
  await cookies().set({
    name: "session_token",
    value: data.session.access_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "Strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days expiration
  });

  return { success: true };
}

export async function logout() {

  const cookieStore = await cookies(); 
  const sessionToken = cookieStore.get("session_token")?.value;

  if (sessionToken) {
    await supabase.auth.signOut();
    cookieStore.delete("session_token");
    console.log("Logged Out succesfully")
  }

  return { success: true };
}

export async function getAuthToken() {
  const cookieStore = await cookies(); // Get cookies store

  const token = cookieStore.get("session_token")?.value || null;
  // console.log("token : ", token);
  return token;
}
