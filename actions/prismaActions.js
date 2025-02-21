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

export default async function GetUser({ slug }) {
  if (!slug) return null;

  const user = await prisma.user.findUnique({
    where: { slug },
  });

  return user;
}

export async function updateUser(email, updatedFields) {
  if (!email || !updatedFields || Object.keys(updatedFields).length === 0) {
    return {success: false, error: "Not enough data to update the user"}
  }
  console.log(updatedFields)

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: updatedFields
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: error.message };
  }
}