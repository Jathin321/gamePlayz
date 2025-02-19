"use server";

import prisma from "./prismaClient";

export async function getUserSlugByEmail(email) {
  if (!email) {
    throw new Error("Email is required");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { slug: true }, // Only fetch the slug
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.slug;
  } catch (error) {
    console.error("Error fetching user slug:", error);
    throw new Error("Failed to fetch user slug");
  }
}
