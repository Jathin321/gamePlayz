import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req) {
  const cookieStore = await cookies(); // Get cookies store

  const token = cookieStore.get("session_token")?.value || null;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Specify the matcher to apply middleware only to specific paths
export const config = {
  matcher: ["/create-space", "/create-tournament","/myFriends","/myScrims","/mySpaces"], // Protect these routes
};
