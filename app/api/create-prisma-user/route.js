import { NextResponse } from "next/server";
import prisma from "@/util/prismaClient";

export async function POST(request) {
  try {
    if (!request.body) {
      console.error("Error: No request body received.");
      return NextResponse.json({ success: false, error: "No request body received" }, { status: 400 });
    }

    const userProfile = await request.json();
    
    if (!userProfile || typeof userProfile !== "object") {
      console.error("Error: Invalid request payload:", userProfile);
      return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
    }

    // 🔹 Create the user in Prisma
    const user = await prisma.user.create({
      data: {
        username: userProfile.username,
        email: userProfile.email,
        slug: userProfile.slug,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
