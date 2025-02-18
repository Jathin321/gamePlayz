"use server";

import prisma from "@/util/prismaClient";

export async function createUser(userProfile) {
  try {
    const user = await prisma.user.create({
      data: {
        fullname: userProfile.fullname,
        username: userProfile.username,
        email: userProfile.email,
        slug: userProfile.slug,
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: error.message };
  }
}
