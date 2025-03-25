"use server";

import prisma from "@/util/prismaClient";
import { supabase } from "@/util/supabase";

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
    console.log("Error creating user:", error);
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
    console.log("Error updating user:", error);
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
    console.log("Error fetching user slug:", error);
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
    console.log("Error checking user existence:", error);
    return { exists: false, error: error.message };
  }
}

export async function getAllUsers() {
  try {
    // Fetch all users instead of using pagination
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc', // Most recent users first
      },
      select: {
        id: true,
        username: true,
        profilePic: true,
        slug: true,
        mostActive: true,  // Changed from mainGame to mostActive which exists in schema
        createdAt: true,
        location: true,
      }
    });
    
    // Process users to ensure consistent data structure
    const processedUsers = users.map(user => ({
      ...user,
      username: user.username || "",
      fullname: user.fullname || "",
    }));
    
    return { 
      success: true, 
      users: processedUsers,
      totalCount: processedUsers.length
    };
  } catch (error) {
    console.error("Error fetching users:", error instanceof Error ? error.message : 'Unknown error');
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function createSpace(spaceData) {
  console.log(spaceData);
  try {
    // Check if the admin is a special_user
    const adminUser = await prisma.user.findUnique({
      where: { id: spaceData.adminId },
      select: { special_user: true }
    });

    if (!adminUser) {
      return {
        success: false,
        error: "Admin user not found.",
      };
    }

    // Only allow special users to create spaces during testing
    if (!adminUser.special_user) {
      return {
        success: false,
        error: "Only verified users can create spaces during the testing phase.",
      };
    }

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
    // console.log("Error fetching spaces:", error);
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
    console.log("Error fetching space details:", error);
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
    console.log("Error fetching games:", error);
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
  // Add validation for slots - ensure it's not greater than 12
  if (scrimData.slots > 12) {
    return { success: false, error: "Slots count cannot exceed 12" };
  }

  try {
    // Check if the admin is a special_user
    const adminUser = await prisma.user.findUnique({
      where: { id: scrimData.adminId },
      select: { special_user: true }
    });

    if (!adminUser) {
      return {
        success: false,
        error: "Admin user not found.",
      };
    }

    // Only allow special users to create scrims during testing
    if (!adminUser.special_user) {
      return {
        success: false,
        error: "Only verified users can create scrims during the testing phase.",
      };
    }

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
    console.log("Error fetching scrims:", error);
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
    console.log("Error fetching scrim details:", error);
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
  if (!matchId || !updatedFields || Object.keys(updatedFields).length == 0) {
    return { success: false, error: "Not enough data to update the match" };
    console.log(updatedFields)
  }

  try {
    // First fetch the match to get its associated scrim
    const match = await prisma.scrimMatch.findUnique({
      where: { id: matchId },
      include: {
        scrim: {
          select: { status: true }
        }
      }
    });

    if (!match) {
      return { success: false, error: "Match not found" };
    }

    // Check if the status is matchmaking before allowing updates to IDP or results
    const isUpdatingIdp = updatedFields.roomId !== undefined || updatedFields.password !== undefined;
    const isUpdatingResults = updatedFields.results !== undefined;

    if ((isUpdatingIdp || isUpdatingResults) && match.scrim.status !== "matchmaking") {
      return { 
        success: false, 
        error: "Match details can only be updated when the scrim status is set to matchmaking" 
      };
    }

    // Proceed with the update if status check passes
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

export async function createScrimRegistration(registrationData) {
  if (!registrationData.teamId || !registrationData.scrimId) {
    return { success: false, error: "Team ID and Scrim ID are required" };
  }

  try {
    // Check if the scrim status is "registering" and get the slots information
    const scrim = await prisma.scrim.findUnique({
      where: { id: registrationData.scrimId },
      select: { status: true, slots: true }
    });

    if (!scrim) {
      return { success: false, error: "Scrim not found" };
    }

    if (scrim.status !== "registering") {
      return { 
        success: false, 
        error: `Registration is not open. Current status: ${scrim.status}` 
      };
    }

    // Count current registrations to check if slots are filled
    const registrationsCount = await prisma.scrimRegistration.count({
      where: { 
        scrimId: registrationData.scrimId,
        canceled: false
      }
    });

    if (registrationsCount >= scrim.slots) {
      return {
        success: false,
        error: "All slots are filled. Registration is closed."
      };
    }

    // Check if the team is already registered for the scrim
    const existingRegistration = await prisma.scrimRegistration.findFirst({
      where: {
        teamId: registrationData.teamId,
        scrimId: registrationData.scrimId,
      },
    });

    if (existingRegistration) {
      return { success: false, error: "This team is already registered for the scrim." };
    }

    // Create the new registration
    const registration = await prisma.scrimRegistration.create({
      data: {
        teamId: registrationData.teamId,
        scrimId: registrationData.scrimId,
      },
    });

    return { success: true, registration };
  } catch (error) {
    console.log("Error creating scrim registration:", error);
    return { success: false, error: error.message };
  }
}

export async function getScrimRegistrations(scrimId) {
  if (!scrimId) {
    return { success: false, error: "Scrim ID is required" };
  }

  try {
    const registrations = await prisma.scrimRegistration.findMany({
      where: { scrimId },
      include: {
        team: true,
      },
    });

    return { success: true, registrations };
  } catch (error) {
    console.log("Error fetching scrim registrations:", error);
    return { success: false, error: error.message };
  }
}

export async function getScrimsBySpaceId(spaceId) {
  if (!spaceId) {
    return { success: false, error: "Space ID is required" };
  }

  try {
    const scrims = await prisma.scrim.findMany({
      where: { spaceId },
      include: {
        game: true,
        space: true,
      },
    });
    return { success: true, scrims };
  } catch (error) {
    console.log("Error fetching scrims by space ID:", error);
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
    // Check if the owner already owns a team (testing phase restriction)
    const ownerTeamsCount = await prisma.team.count({
      where: { ownerId: teamData.ownerId },
    });

    // During testing phase, limit to one team per user
    if (ownerTeamsCount >= 1) {
      return {
        success: false,
        error: "During the testing phase, you can only create one team per user.",
      };
    }

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
    console.log("Error creating team:", error);
    return { success: false, error: error.message };
  }
}

export async function getAllTeams() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        _count: {
          select: { members: true },
        },
        members: {
          select: {
            userId: true,
          },
        },
      },
    });
    return { success: true, teams };
  } catch (error) {
    console.log("Error fetching teams:", error);
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
        owner: {
          select: {
            id: true,
            fullname: true,
            username: true,
            slug: true,
          },
        },
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
    console.log("Error fetching team details:", error);
    return { success: false, error: error.message };
  }
}

export async function updateTeamDetails(slug, updatedData) {
  if (!slug || !updatedData || Object.keys(updatedData).length === 0) {
    return { success: false, error: "No fields are changed to update the team" };
  }

  // Check for empty team name
  if (updatedData.name !== undefined) {
    if (!updatedData.name.trim()) {
      return { success: false, error: "Team name cannot be empty" };
    }
  }

  // Check for empty slug
  if (updatedData.slug !== undefined) {
    if (!updatedData.slug.trim()) {
      return { success: false, error: "Team slug cannot be empty" };
    }
  }

  try {
    const updatedTeam = await prisma.team.update({
      where: { slug },
      data: updatedData,
    });

    return { success: true, team: updatedTeam };
  } catch (error) {
    console.log("Error updating team:", error);
    return { success: false, error: error.message };
  }
}

export async function createTeamJoinRequest(senderId, teamId) {
  if (!senderId || !teamId) {
    return { success: false, error: "Sender ID and Team ID are required" };
  }

  try {
    // Check if there's already a pending request from this user to this team
    const existingRequest = await prisma.teamJoinRequest.findFirst({
      where: {
        senderId,
        teamId,
        status: "pending" // Only check for pending requests
      },
    });

    if (existingRequest) {
      return { 
        success: false, 
        error: "You already have a pending join request for this team" 
      };
    }

    // Create the join request if no pending request exists
    const joinRequest = await prisma.teamJoinRequest.create({
      data: {
        senderId,
        teamId,
      },
    });

    return { success: true, joinRequest };
  } catch (error) {
    // console.log("Error creating team join request:", error);
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
    // console.log("Error fetching team join requests:", error);
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
    console.log("Error fetching teams:", error);
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
    console.log("Error updating join request status:", error);
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
    console.log("Error adding user to team:", error);
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
    console.log("Error checking team membership:", error);
    return { success: false, error: error.message };
  }
}

export async function sendLiveChatMessage(senderId, content, contextType, contextId, repliedToId = null) {
  try {
    const newMessage = await prisma.liveChatMessage.create({
      data: {
        content,
        senderId,
        repliedToId,
        contextType,
        contextId
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          }
        },
        repliedTo: repliedToId ? {
          select: {
            id: true,
            username: true,
          }
        } : undefined
      }
    });
    
    return { success: true, message: newMessage };
  } catch (error) {
    console.log("Error sending live chat message:", error);
    return { success: false, error: "Failed to send message" };
  }
}

export async function getLiveChatMessages(contextType, contextId, limit = 100) {
  try {
    const messages = await prisma.liveChatMessage.findMany({
      where: {
        contextType,
        contextId
      },
      orderBy: {
        createdAt: 'asc' // Oldest to newest for initial load
      },
      take: limit,
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          }
        },
        repliedTo: {
          select: {
            id: true,
            username: true,
          }
        }
      }
    });
    
    return { success: true, messages };
  } catch (error) {
    console.log("Error fetching live chat messages:", error);
    return { success: false, error: "Failed to fetch messages" };
  }
}

export async function getAnnouncements(contextType, contextId) {
  try {
    const announcements = await prisma.announcement.findMany({
      where: {
        contextType,
        contextId
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            profilePic: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc' // Newest first
      }
    });
    
    return { success: true, announcements };
  } catch (error) {
    console.log("Error fetching announcements:", error);
    return { success: false, error: error.message };
  }
}

export async function createAnnouncement(announcementData) {
  try {
    // Validate required fields
    if (!announcementData.title || !announcementData.content || 
        !announcementData.senderId || !announcementData.contextType || 
        !announcementData.contextId) {
      return { success: false, error: "Missing required fields" };
    }

    // Create the announcement in the database
    const announcement = await prisma.announcement.create({
      data: {
        title: announcementData.title,
        content: announcementData.content,
        important: !!announcementData.important,
        senderId: announcementData.senderId,
        contextType: announcementData.contextType,
        contextId: announcementData.contextId
      }
    });

    // Use the existing supabase client - no need to create a new one
    const channelId = `${announcementData.contextType}-${announcementData.contextId}`;
    
    // Broadcast to the appropriate channel
    await supabase.channel(channelId).send({
      type: 'broadcast',
      event: 'new-announcement',
      payload: {
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        type: announcementData.type || "update",
        important: announcement.important,
        sender: announcement.sender?.username || "Admin",
        senderAvatar: announcement.sender?.profilePic,
        createdAt: announcement.createdAt
      }
    });

    return {
      success: true,
      announcement
    };
  } catch (error) {
    // console.log("Error creating announcement:", error);
    return {
      success: false,
      error: error
    };
  }
}


// Add to e:\GamePlayz v1\gameplayz\actions\prismaActions.js

export async function sendPasswordResetOTP(email) {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: "No account found with this email address." };
    }

    // Use the correct URL path for verification
    const redirectUrl = new URL('/verify/resetPassword', process.env.NEXT_PUBLIC_SITE_URL).toString();
    console.log("Sending reset email to:", email, "with redirect to:", redirectUrl);

    // Send password reset link via Supabase
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl
    });

    if (error) {
      console.error("Error sending reset link:", error);
      return { success: false, error: error.message };
    }

    console.log("Password reset email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending password reset link:", error instanceof Error ? error.message : 'Unknown error');
    return { success: false, error: "Failed to send password reset link." };
  }
}

export async function resetPassword(newPassword) {
  try {
    // Reset password in Supabase Auth using the active session
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error resetting password:", error instanceof Error ? error.message : 'Unknown error');
    return { success: false, error: "Failed to reset password." };
  }
}