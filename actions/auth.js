"use server";
import { cookies } from "next/headers";
import { supabase } from "@/util/supabase";

export async function login(email, password) {
  if (!email || !password) {
    return { error: "Both email and password are required." };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message || "Invalid login credentials." };
  }

  // Get cookies store
  const cookieStore = await cookies();

  // Set session token in HTTP-only cookie
  cookieStore.set({
    name: "session_token",
    value: data.session.access_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "Strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days expiration
  });

  // Set user details in HTTP-only cookie
  cookieStore.set({
    name: "user_details",
    value: JSON.stringify(data.user),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "Strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days expiration
  });

  return { success: true, user: data.user };
}

export async function logout() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  const user = cookieStore.get("user_details")?.value;

  if (sessionToken) {
    await supabase.auth.signOut();
    cookieStore.delete("session_token");
    console.log("Logged Out successfully");
  }

  if (user) {
    cookieStore.delete("user_details");
  }

  return { success: true };
}

export async function getAuthToken() {
  const cookieStore = await cookies(); // Get cookies store

  const token = cookieStore.get("session_token")?.value || null;
  return token;
}

export async function getUserEmail() {
  const cookieStore = await cookies(); // Get cookies store

  const userDetails = cookieStore.get("user_details")?.value;
  if (!userDetails) {
    return { error: "User details not found" };
  }

  try {
    const user = JSON.parse(userDetails);
    const email = user.email;
    return { success: true, email };
  } catch (error) {
    console.error("Error parsing user details:", error);
    return { error: "Error parsing user details" };
  }
}

export async function getUserId() {
  const cookieStore = await cookies(); // Get cookies store

  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const userDetails = cookieStore.get("user_details")?.value;
  if (!userDetails) {
    return { error: "User details not found" };
  }

  try {
    const user = JSON.parse(userDetails);
    // console.log("user id : ", user);
    const userId = user.id;
    return { success: true, userId };
  } catch (error) {
    console.error("Error parsing user details:", error);
    return { error: "Error parsing user details" };
  }
}