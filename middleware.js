import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req) {
  const cookieStore = await cookies(); // Get cookies store

  const token = cookieStore.get("auth_session")?.value || null;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Specify the matcher to apply middleware only to specific paths
export const config = {
  matcher: ["/create-space", "/create-tournament", "/create-scrim", "/create-team" ,"/myFriends","/myScrims","/mySpaces", "/scrims/:slug/register"], // Protect these routes
};
