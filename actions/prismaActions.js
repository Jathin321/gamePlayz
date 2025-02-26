"use server";

import prisma from "@/util/prismaClient";

export async function createUser(userProfile) {
  try {
    const user = await prisma.user.create({
      data: {
        id: userProfile.userId, // Use userId from userProfile
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

  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const user = await prisma.user.findUnique({
    where: { slug },
  });

  return user;
}

export async function updateUser(email, updatedFields) {
  if (!email || !updatedFields || Object.keys(updatedFields).length === 0) {
    return { success: false, error: "Not enough data to update the user" };
  }
  console.log(updatedFields);

  try {
    // Check if the username is in the updatedFields
    if (updatedFields.username !== undefined) {
      // Ensure the username is not an empty string
      if (updatedFields.username.trim() === "") {
        return { success: false, error: "Username should not be an empty string." };
      }

      // Check if the username is already in use by another user
      const existingUser = await prisma.user.findFirst({
        where: {
          username: updatedFields.username,
          email: { not: email }, // Exclude the current user
        },
      });

      if (existingUser) {
        return { success: false, error: "Username is already in use by another user." };
      }
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: updatedFields,
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: error.message };
  }
}

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

export async function checkUserExists(username, email) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    return { exists: !!user };
  } catch (error) {
    console.error("Error checking user existence:", error);
    return { exists: false, error: error.message };
  }
}

export async function createSpace(spaceData) {
  console.log(spaceData);
  try {
    // Check if a space with the same name or slug already exists
    const existingSpace = await prisma.space.findFirst({
      where: {
        OR: [{ spaceName: spaceData.spaceName }, { slug: spaceData.slug }],
      },
    });

    if (existingSpace) {
      return {
        success: false,
        error: "Space with the same name or slug already exists.",
      };
    }

    const space = await prisma.space.create({
      data: {
        slug: spaceData.slug,
        spaceName: spaceData.spaceName,
        desc: spaceData.desc,
        profilePic: spaceData.profilePic || null, // Ensure profilePic is not null
        banner: spaceData.banner || null, // Ensure banner is not null
        admin: {
          connect: { id: spaceData.adminId }, // Use connect syntax to reference user id
        },
      },
    });

    return { success: true, space };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getAllSpaces() {
  try {
    const spaces = await prisma.space.findMany({
      include: {
        admin: true, // Include admin user data
      },
    });
    return { success: true, spaces };
  } catch (error) {
    console.error("Error fetching spaces:", error);
    return { success: false, error: error.message };
  }
}

export async function getSpaceDetailsBySlug(slug) {
  if (!slug) {
    throw new Error("Slug is required");
  }

  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const space = await prisma.space.findUnique({
      where: { slug },
      include: {
        admin: true, // Include admin user data
      },
    });

    if (!space) {
      throw new Error("Space not found");
    }
    // console.log(space)

    return space;
  } catch (error) {
    console.error("Error fetching space details:", error);
    throw new Error("Failed to fetch space details");
  }
}

export async function updateSpace(slug, updatedData) {
  if (!slug || !updatedData || Object.keys(updatedData).length == 0) {
    return { success: false, error: "No Fields are changed to update the space" };
  }

  try {
    const updatedSpace = await prisma.space.update({
      where: { slug },
      data: updatedData,
    });

    return { success: true, space: updatedSpace };
  } catch (error) {
    console.log("Error updating space:", error);
    return { success: false, error: error.message };
  }
}

export async function getAllGames() {
  try {
    const games = await prisma.game.findMany();
    return { success: true, games };
  } catch (error) {
    console.error("Error fetching games:", error);
    return { success: false, error: error.message };
  }
}

export async function createScrim(scrimData) {
  // Validation checks
  if (!scrimData.name) {
    return { success: false, error: "Scrim name is required" };
  }
  if (!scrimData.slug) {
    return { success: false, error: "Scrim slug is required" };
  }
  if (!scrimData.gameId) {
    return { success: false, error: "Game ID is required" };
  }
  if (!scrimData.spaceId) {
    return { success: false, error: "Space ID is required" };
  }
  if (!scrimData.adminId) {
    return { success: false, error: "Admin ID is required" };
  }
  if (!scrimData.startDate) {
    return { success: false, error: "Start Date is required" };
  }
  if (!scrimData.endDate) {
    return { success: false, error: "End Date is required" };
  }
  if (new Date(scrimData.startDate) >= new Date(scrimData.endDate)) {
    return { success: false, error: "Start date must be before end date" };
  }
  if (scrimData.rules.length < 1) {
    return { success: false, error: "At least 1 rule should be mentioned" };
  }
  if (!scrimData.matchesCount || scrimData.matchesCount < 1) {
    return { success: false, error: "Matches count must be at least 1" };
  }

  try {
    // Check if a scrim with the same name or slug already exists
    const existingScrim = await prisma.scrim.findFirst({
      where: {
        OR: [{ name: scrimData.name }, { slug: scrimData.slug }],
      },
    });

    if (existingScrim) {
      return {
        success: false,
        error: "Scrim with the same name or slug already exists.",
      };
    }

    // Insert the scrim data into the scrims table
    const scrim = await prisma.scrim.create({
      data: {
        slug: scrimData.slug,
        name: scrimData.name,
        gameId: scrimData.gameId,
        spaceId: scrimData.spaceId,
        adminId: scrimData.adminId,
        banner: scrimData.banner || null,
        startDate: new Date(scrimData.startDate),
        endDate: new Date(scrimData.endDate),
        description: scrimData.description,
        rules: scrimData.rules,
        teamSize: scrimData.teamSize,
        prizePool: scrimData.prizePool,
        entryFee: scrimData.entryFee,
        slots: scrimData.slots,
        status: scrimData.status,
        matchesCount: scrimData.matchesCount,
      },
    });

    const scrimId = scrim.id;
    console.log(scrimId);

    // Create records in the scrimMatches table
    const matchPromises = [];
    for (let i = 0; i < scrimData.matchesCount; i++) {
      matchPromises.push(
        prisma.scrimMatch.create({
          data: {
            scrim: {
              connect: { id: scrimId },
            },
            matchNumber: i + 1,
            startDate: null,
            roomId: null,
            password: null,
            results: [],
          },
        })
      );
    }
    await Promise.all(matchPromises);

    return { success: true, scrim };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getAllScrims() {
  try {
    const scrims = await prisma.scrim.findMany({
      include: {
        game: true,
        space: true,
      },
    });
    return { success: true, scrims };
  } catch (error) {
    console.error("Error fetching scrims:", error);
    return { success: false, error: error.message };
  }
}

export async function getScrimDetailsBySlug(slug) {
  if (!slug) {
    throw new Error("Slug is required");
  }

  try {
    const scrim = await prisma.scrim.findUnique({
      where: { slug },
      include: {
        game: true,
        space: true,
        admin: true,
        matches: true,
      },
    });

    if (!scrim) {
      throw new Error("Scrim not found");
    }

    return { success: true, scrim };
  } catch (error) {
    console.error("Error fetching scrim details:", error);
    return { success: false, error: error.message };
  }
}

export async function updateScrimStatus(slug, updatedFields) {
  if (!slug || !updatedFields || Object.keys(updatedFields).length === 0) {
    return { success: false, error: "Not enough data to update the scrim status" };
  }

  try {
    const updatedScrim = await prisma.scrim.update({
      where: { slug },
      data: updatedFields,
    });

    return { success: true, scrim: updatedScrim };
  } catch (error) {
    console.log("Error updating scrim status:", error);
    return { success: false, error: error.message };
  }
}

export async function updateScrimMatch(matchId, updatedFields) {
  if (!matchId || !updatedFields || Object.keys(updatedFields).length === 0) {
    return { success: false, error: "Not enough data to update the match" };
  }

  try {
    const updatedMatch = await prisma.scrimMatch.update({
      where: { id: matchId },
      data: updatedFields,
    });

    return { success: true, match: updatedMatch };
  } catch (error) {
    console.log("Error updating match:", error);
    return { success: false, error: error.message };
  }
}

export async function createTeam(teamData) {
  // Validation checks
  if (!teamData.slug) {
    return { success: false, error: "Team slug is required" };
  }
  if (!teamData.name) {
    return { success: false, error: "Team name is required" };
  }
  if (!teamData.ownerId) {
    return { success: false, error: "Owner ID is required" };
  }

  try {
    // Check if a team with the same slug or name already exists
    const existingTeam = await prisma.team.findFirst({
      where: {
        OR: [
          { slug: teamData.slug },
          { name: teamData.name },
        ],
      },
    });

    if (existingTeam) {
      return {
        success: false,
        error: "Team with the same slug or name already exists.",
      };
    }

    // Insert the team data into the teams table
    const team = await prisma.team.create({
      data: {
        slug: teamData.slug,
        name: teamData.name,
        ownerId: teamData.ownerId,
        desc: teamData.desc || "",
        profilePic: teamData.profilePic || null,
        banner: teamData.banner || null,
      },
    });

    // Create a team member for the team owner as an admin
    await prisma.teamMember.create({
      data: {
        teamId: team.id,
        userId: teamData.ownerId,
        role: 'player',
        isAdmin: true,
      },
    });

    return { success: true, team };
  } catch (error) {
    // console.log("Error creating team:", error);
    return { success: false, error: error.message };
  }
}

export async function getAllTeams() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        owner: true,
        _count: {
          select: { members: true },
        },
      },
    });
    return { success: true, teams };
  } catch (error) {
    console.error("Error fetching teams:", error);
    return { success: false, error: error.message };
  }
}

export async function getTeamDetailsBySlug(slug) {
  if (!slug) {
    throw new Error("Slug is required");
  }

  try {
    const team = await prisma.team.findUnique({
      where: { slug },
      include: {
        owner: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                fullname: true,
                username: true,
                profilePic: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!team) {
      throw new Error("Team not found");
    }

    return { success: true, team };
  } catch (error) {
    console.error("Error fetching team details:", error);
    return { success: false, error: error.message };
  }
}

export async function updateTeamDetails(slug, updatedData) {
  if (!slug || !updatedData || Object.keys(updatedData).length === 0) {
    return { success: false, error: "No fields are changed to update the team" };
  }

  try {
    const updatedTeam = await prisma.team.update({
      where: { slug },
      data: updatedData,
    });

    return { success: true, team: updatedTeam };
  } catch (error) {
    console.error("Error updating team:", error);
    return { success: false, error: error.message };
  }
}

export async function createTeamJoinRequest(senderId, teamId) {
  if (!senderId || !teamId) {
    return { success: false, error: "Sender ID and Team ID are required" };
  }

  try {
    const joinRequest = await prisma.teamJoinRequest.create({
      data: {
        senderId,
        teamId,
      },
    });

    return { success: true, joinRequest };
  } catch (error) {
    console.error("Error creating team join request:", error);
    return { success: false, error: error.message };
  }
}

export async function getTeamJoinRequestsByUser(userId) {
  if (!userId) {
    return { success: false, error: "User ID is required" };
  }

  try {
    const joinRequests = await prisma.teamJoinRequest.findMany({
      where: { senderId: userId },
      include: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        
      },
    });

    return { success: true, joinRequests };
  } catch (error) {
    // console.error("Error fetching team join requests:", error);
    return { success: false, error: error.message };
  }
}

export async function getTeamJoinRequests(teamId) {
  if (!teamId) {
    return { success: false, error: "Team ID is required" };
  }

  try {
    const joinRequests = await prisma.teamJoinRequest.findMany({
      where: { teamId },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          },
        },
      },
    });

    return { success: true, joinRequests };
  } catch (error) {
    // console.log("Error fetching team join requests:", error);
    return { success: false, error: error.message };
  }
}

export async function getTeamsByUserId(userId) {
  if (!userId) {
    return { success: false, error: "User ID is required" };
  }

  try {
    const teams = await prisma.team.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { userId } } },
        ],
      },
      include: {
        members: {
          select: {
            userId: true,
            role: true,
            user: {
              select: {
                id: true,
                username: true,
                profilePic: true,
              },
            },
          },
        },
      },
    });

    return { success: true, teams };
  } catch (error) {
    console.error("Error fetching teams:", error);
    return { success: false, error: error.message };
  }
}

export async function updateJoinRequestStatus(requestId, status) {
  if (!requestId || !status) {
    return { success: false, error: "Request ID and status are required" };
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const updatedRequest = await prisma.teamJoinRequest.update({
      where: { id: requestId },
      data: { status },
    });

    return { success: true, joinRequest: updatedRequest };
  } catch (error) {
    console.error("Error updating join request status:", error);
    return { success: false, error: error.message };
  }
}

export async function addUserToTeam(teamId, userId) {
  if (!teamId || !userId) {
    return { success: false, error: "Team ID and User ID are required" };
  }

  try {
    const newMember = await prisma.teamMember.create({
      data: {
        teamId,
        userId,
        role: 'player',
        isAdmin: false,
      },
    });

    return { success: true, teamMember: newMember };
  } catch (error) {
    console.error("Error adding user to team:", error);
    return { success: false, error: error.message };
  }
}

export async function isUserTeamMember(teamId, userId) {
  if (!teamId || !userId) {
    return { success: false, error: "Team ID and User ID are required" };
  }

  try {
    const member = await prisma.teamMember.findFirst({
      where: {
        teamId,
        userId,
      },
    });

    return { success: true, isMember: !!member };
  } catch (error) {
    console.error("Error checking team membership:", error);
    return { success: false, error: error.message };
  }
}