"use server";

import { supabase } from "@/util/supabase";

export async function createUser(userProfile) {
  try {
    
    const { data: user, error } = await supabase
      .from("user_profiles")
      .insert([{
        id: userProfile.userId,
        fullname: userProfile.fullname,
        username: userProfile.username,
        email: userProfile.email,
        slug: userProfile.slug
      }])
      .select()
      .single();

    if (error) throw error;
    
    return { success: true, user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: error.message };
  }
}

export default async function GetUser({ slug }) {
  if (!slug) return null;

  try {
    
    const { data: user, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function updateUser(email, updatedFields) {
  if (!email || !updatedFields || Object.keys(updatedFields).length === 0) {
    return { success: false, error: "Not enough data to update the user" };
  }

  try {
    
    // Convert camelCase keys to snake_case for database
    const dbFields = {};
    Object.entries(updatedFields).forEach(([key, value]) => {
      // Handle special fields that need conversion
      if (key === "profilePic") {
        dbFields["profile_pic"] = value;
      } else if (key === "dateOfBirth") {
        dbFields["date_of_birth"] = value;
      } else if (key === "motherTongue") {
        dbFields["mother_tongue"] = value;
      } else if (key === "mostActive") {
        dbFields["most_active"] = value;
      } else {
        // Keep fields that don't need conversion
        dbFields[key] = value;
      }
    });

    // Check if the username is in the updatedFields
    if (updatedFields.username !== undefined) {
      // Ensure the username is not an empty string
      if (updatedFields.username.trim() === "") {
        return { success: false, error: "Username should not be an empty string." };
      }

      // Check if username is already in use by another user
      const { data: existingUser, error: checkError } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("username", updatedFields.username)
        .neq("email", email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = No rows returned, which is good
        throw checkError;
      }

      if (existingUser) {
        return { success: false, error: "Username is already in use by another user." };
      }
    }

    // Update the user
    const { data: updatedUser, error } = await supabase
      .from("user_profiles")
      .update(dbFields)
      .eq("email", email)
      .select()
      .single();

    if (error) throw error;

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: error.message };
  }
}

export async function checkUserExists(username, email) {
  try {
    
    const { data, error } = await supabase
      .from("user_profiles")
      .select("id")
      .or(`username.eq.${username},email.eq.${email}`)
      .limit(1);

    if (error) throw error;
    
    return { exists: data && data.length > 0 };
  } catch (error) {
    console.error("Error checking user existence:", error);
    return { exists: false, error: error.message };
  }
}

export async function getUserSlugByEmail(email) {
  if (!email) {
    throw new Error("Email is required");
  }

  try {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("slug")
      .eq("email", email)
      .single();

    if (error) {return { success: false, error: error.message };}
    if (!data) throw new Error("User not found");

    return data.slug;
  } catch (error) {
    console.error("Error fetching user slug:", error);
    throw new Error("Failed to fetch user slug");
  }
}

export async function createSpace(spaceData) {
  try {
    
    // Check if user has special_user privileges
    const { data: userData, error: userError } = await supabase
      .from("user_profiles")
      .select("special_user")
      .eq("id", spaceData.adminId)
      .single();
    
    if (userError) throw userError;
    
    if (!userData.special_user) {
      return { 
        success: false, 
        error: "Only special users can create spaces" 
      };
    }

    // Check if a space with the same name or slug exists
    const { data: existingSpaces, error: checkError } = await supabase
      .from("spaces")
      .select("id")
      .or(`space_name.eq.${spaceData.spaceName},slug.eq.${spaceData.slug}`)
      .limit(1);

    if (checkError) throw checkError;
    
    if (existingSpaces && existingSpaces.length > 0) {
      return {
        success: false,
        error: "Space with the same name or slug already exists."
      };
    }

    // Create the space with snake_case column names
    const { data: space, error: insertError } = await supabase
      .from("spaces")
      .insert([{
        slug: spaceData.slug,
        space_name: spaceData.spaceName,
        desc: spaceData.desc,
        profile_pic: spaceData.profilePic || null,
        banner: spaceData.banner || null,
        admin_id: spaceData.adminId
      }])
      .select("*, admin:admin_id(*)")
      .single();

    if (insertError) throw insertError;

    return { success: true, space };
  } catch (error) {
    console.error("Error creating space:", error);
    return { success: false, error: error.message };
  }
}

export async function getAllSpaces() {
  try {
    
    const { data: spaces, error } = await supabase
      .from("spaces")
      .select("*");

    if (error) throw error;
    
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
    
    const { data: space, error } = await supabase
      .from("spaces")
      .select("*, admin:admin_id(*)")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    if (!space) throw new Error("Space not found");

    return space;
  } catch (error) {
    console.error("Error fetching space details:", error);
    throw new Error("Failed to fetch space details");
  }
}

export async function updateSpace(slug, updatedData) {
  if (!slug || !updatedData || Object.keys(updatedData).length === 0) {
    return { success: false, error: "No fields are changed to update the space" };
  }

  try {
    
    // Convert camelCase keys to snake_case for database
    const dbFields = {};
    Object.entries(updatedData).forEach(([key, value]) => {
      // Special handling for specific fields
      if (key === "spaceName") {
        dbFields["space_name"] = value;
      } else if (key === "profilePic") {
        dbFields["profile_pic"] = value;
      } else {
        dbFields[key] = value;
      }
    });

    const { data: updatedSpace, error } = await supabase
      .from("spaces")
      .update(dbFields)
      .eq("slug", slug)
      .select()
      .single();

    if (error) throw error;

    return { success: true, space: updatedSpace };
  } catch (error) {
    console.error("Error updating space:", error);
    return { success: false, error: error.message };
  }
}






export async function getAllGames() {
  try {
    const { data: games, error } = await supabase
      .from("games")
      .select("*");

    if (error) throw error;
    
    return { success: true, games };
  } catch (error) {
    // console.log("Error fetching games:", error);
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
  if (scrimData.slots > 12) {
    return { success: false, error: "Slots count cannot exceed 12" };
  }

  try {
    // First, check if user has special_user privileges (RLS check in application code)
    const { data: userData, error: userError } = await supabase
      .from("user_profiles")
      .select("special_user")
      .eq("id", scrimData.adminId)
      .single();
    
    if (userError) throw userError;
    
    if (!userData.special_user) {
      return { 
        success: false, 
        error: "You don't have permission to create scrims" 
      };
    }

    // Check if a scrim with the same name or slug already exists
    const { data: nameExists } = await supabase
      .from("scrims")
      .select("id")
      .eq("name", scrimData.name)
      .limit(1);
      
    if (nameExists && nameExists.length > 0) {
      return {
        success: false,
        error: "A scrim with this name already exists"
      };
    }
    
    const { data: slugExists } = await supabase
      .from("scrims")
      .select("id")
      .eq("slug", scrimData.slug)
      .limit(1);
      
    if (slugExists && slugExists.length > 0) {
      return {
        success: false,
        error: "A scrim with this slug already exists"
      };
    }

    // Insert the scrim data - note the snake_case for column names
    const { data: scrim, error: insertError } = await supabase
      .from("scrims")
      .insert([{
        slug: scrimData.slug,
        name: scrimData.name,
        game_id: scrimData.gameId,
        space_id: scrimData.spaceId,
        admin_id: scrimData.adminId,
        banner: scrimData.banner || null,
        start_date: new Date(scrimData.startDate).toISOString(),
        end_date: new Date(scrimData.endDate).toISOString(),
        description: scrimData.description,
        rules: scrimData.rules,
        team_size: scrimData.teamSize,
        prize_pool: scrimData.prizePool,
        entry_fee: scrimData.entryFee,
        slots: scrimData.slots,
        status: scrimData.status,
        matches_count: scrimData.matchesCount
      }])
      .select()
      .single();
    
    if (insertError) throw insertError;
    
    if (!scrim) {
      throw new Error("Failed to create scrim");
    }

    // Create matches for the scrim
    const matchesData = [];
    for (let i = 0; i < scrimData.matchesCount; i++) {
      matchesData.push({
        scrim_id: scrim.id,
        match_number: i + 1,
        room_id: null,
        password: null,
        results: []
      });
    }
    
    const { error: matchError } = await supabase
      .from("scrim_matches")
      .insert(matchesData);
      
    if (matchError) throw matchError;

    return { success: true, scrim };
  } catch (error) {
    // console.error("Error creating scrim:", error);
    return { success: false, error: error.message };
  }
}

export async function getAllScrims() {
  try {
    const { data: scrims, error } = await supabase
      .from("scrims")
      .select(`
        *,
        game:game_id(*),
        space:space_id(*)
      `);

    if (error) throw error;
    
    return { success: true, scrims };
  } catch (error) {
    // console.log("Error fetching scrims:", error);
    return { success: false, error: error.message };
  }
}

export async function getScrimDetailsBySlug(slug) {
  if (!slug) {
    throw new Error("Slug is required");
  }

  try {
    const { data: scrim, error } = await supabase
      .from("scrims")
      .select(`
        *,
        game:game_id(*),
        space:space_id(*),
        admin:admin_id(*),
        matches:scrim_matches(*)
      `)
      .eq("slug", slug)
      .single();

    if (error) throw error;
    if (!scrim) throw new Error("Scrim not found");

    return { success: true, scrim };
  } catch (error) {
    // console.log("Error fetching scrim details:", error);
    return { success: false, error: error.message };
  }
}

// Add other functions from prismaActions.js as needed with exact same names
export async function updateScrimStatus(slug, updatedFields) {
  if (!slug || !updatedFields || Object.keys(updatedFields).length === 0) {
    return { success: false, error: "Not enough data to update the scrim status" };
  }

  try {
    // Convert camelCase keys to snake_case for database
    const dbFields = {};
    Object.entries(updatedFields).forEach(([key, value]) => {
      if (key === "startDate") {
        dbFields["start_date"] = value;
      } else if (key === "endDate") {
        dbFields["end_date"] = value;
      } else if (key === "teamSize") {
        dbFields["team_size"] = value;
      } else if (key === "prizePool") {
        dbFields["prize_pool"] = value;
      } else if (key === "entryFee") {
        dbFields["entry_fee"] = value;
      } else if (key === "matchesCount") {
        dbFields["matches_count"] = value;
      } else {
        dbFields[key] = value;
      }
    });

    const { data: updatedScrim, error } = await supabase
      .from("scrims")
      .update(dbFields)
      .eq("slug", slug)
      .select()
      .single();

    if (error) throw error;

    return { success: true, scrim: updatedScrim };
  } catch (error) {
    // console.log("Error updating scrim status:", error);
    return { success: false, error: error.message };
  }
}

export async function updateScrimMatch(matchId, updatedFields) {
  if (!matchId || !updatedFields || Object.keys(updatedFields).length === 0) {
    return { success: false, error: "Not enough data to update the match" };
  }

  try {
    // First fetch the match to get its associated scrim
    const { data: match, error: fetchError } = await supabase
      .from("scrim_matches")
      .select("*, scrim:scrim_id(status)")
      .eq("id", matchId)
      .single();

    if (fetchError) throw fetchError;
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

    // Convert camelCase keys to snake_case for database
    const dbFields = {};
    Object.entries(updatedFields).forEach(([key, value]) => {
      if (key === "roomId") {
        dbFields["room_id"] = value;
      } else if (key === "matchNumber") {
        dbFields["match_number"] = value;
      } else if (key === "startDate") {
        dbFields["start_date"] = value;
      } else {
        dbFields[key] = value;
      }
    });

    // Proceed with the update if status check passes
    const { data: updatedMatch, error } = await supabase
      .from("scrim_matches")
      .update(dbFields)
      .eq("id", matchId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, match: updatedMatch };
  } catch (error) {
    // console.log("Error updating match:", error);
    return { success: false, error: error.message };
  }
}

export async function createScrimRegistration(registrationData) {
    if (!registrationData.teamId || !registrationData.scrimId) {
      return { success: false, error: "Team ID and Scrim ID are required" };
    }
  
    try {
      // Check if the scrim status is "registering" and get the slots information
      const { data: scrim, error: scrimError } = await supabase
        .from("scrims")
        .select("status, slots")
        .eq("id", registrationData.scrimId)
        .single();
  
      if (scrimError) throw scrimError;
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
      const { count: registrationsCount, error: countError } = await supabase
        .from("scrim_registrations")
        .select("*", { count: "exact", head: true })
        .eq("scrim_id", registrationData.scrimId)
        .eq("canceled", false);
  
      if (countError) throw countError;
  
      if (registrationsCount >= scrim.slots) {
        return {
          success: false,
          error: "All slots are filled. Registration is closed."
        };
      }
  
      // Check if the team is already registered for the scrim
      const { data: existingReg, error: existingError } = await supabase
        .from("scrim_registrations")
        .select("id")
        .eq("team_id", registrationData.teamId)
        .eq("scrim_id", registrationData.scrimId)
        .limit(1);
  
      if (existingError) throw existingError;
  
      if (existingReg && existingReg.length > 0) {
        return { success: false, error: "This team is already registered for the scrim." };
      }
  
      // Create the new registration
      const { data: registration, error: regError } = await supabase
        .from("scrim_registrations")
        .insert([{
          team_id: registrationData.teamId,
          scrim_id: registrationData.scrimId,
        }])
        .select()
        .single();
  
      if (regError) throw regError;
  
      return { success: true, registration };
    } catch (error) {
    //   console.log("Error creating scrim registration:", error);
      return { success: false, error: error.message };
    }
  }
  
  export async function getScrimRegistrations(scrimId) {
    if (!scrimId) {
      return { success: false, error: "Scrim ID is required" };
    }
  
    try {
      const { data: registrations, error } = await supabase
        .from("scrim_registrations")
        .select(`*, team:team_id(*)`)
        .eq("scrim_id", scrimId);
  
      if (error) throw error;
  
      return { success: true, registrations };
    } catch (error) {
    //   console.log("Error fetching scrim registrations:", error);
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
      // Check if the owner already owns three or more teams
      const { count: ownerTeamsCount, error: countError } = await supabase
        .from("teams")
        .select("*", { count: "exact", head: true })
        .eq("owner_id", teamData.ownerId);
  
      if (countError) throw countError;
  
      if (ownerTeamsCount >= 3) {
        return {
          success: false,
          error: "You are already the owner of three or more teams, cannot create new team.",
        };
      }
  
      // Check if a team with the same slug or name already exists
      const { data: existingTeam, error: existingError } = await supabase
        .from("teams")
        .select("id")
        .or(`slug.eq.${teamData.slug},name.eq.${teamData.name}`)
        .limit(1);
  
      if (existingError) throw existingError;
  
      if (existingTeam && existingTeam.length > 0) {
        return {
          success: false,
          error: "Team with the same slug or name already exists.",
        };
      }
  
      // Insert the team data into the teams table
      const { data: team, error: teamError } = await supabase
        .from("teams")
        .insert([{
          slug: teamData.slug,
          name: teamData.name,
          owner_id: teamData.ownerId,
          desc: teamData.desc || "",
          profile_pic: teamData.profilePic || null,
          banner: teamData.banner || null,
        }])
        .select()
        .single();
  
      if (teamError) throw teamError;
  
      // Create a team member for the team owner as an admin
      const { error: memberError } = await supabase
        .from("team_members")
        .insert([{
          team_id: team.id,
          user_id: teamData.ownerId,
          role: 'player',
          is_admin: true,
        }]);
  
      if (memberError) throw memberError;
  
      return { success: true, team };
    } catch (error) {
    //   console.log("Error creating team:", error);
      return { success: false, error: error.message };
    }
  }
  
  export async function getAllTeams() {
    try {
      // First get all teams
      const { data: teams, error } = await supabase
        .from("teams")
        .select("*");
  
      if (error) throw error;
  
      // For each team, get the member count and member IDs in a separate call
      const teamsWithMembers = await Promise.all(teams.map(async (team) => {
        const { data: members } = await supabase
          .from("team_members")
          .select("user_id")
          .eq("team_id", team.id);
        
        return {
          ...team,
          _count: { 
            members: members ? members.length : 0 
          },
          members: members || []
        };
      }));
      
      return { success: true, teams: teamsWithMembers };
    } catch (error) {
    //   console.log("Error fetching teams:", error);
      return { success: false, error: error.message };
    }
  }
  
  export async function getTeamDetailsBySlug(slug) {
    if (!slug) {
      throw new Error("Slug is required");
    }
  
    try {
      // Get team details
      const { data: team, error } = await supabase
        .from("teams")
        .select(`
          *,
          owner:owner_id(id, fullname, username, slug)
        `)
        .eq("slug", slug)
        .single();
  
      if (error) throw error;
      if (!team) throw new Error("Team not found");
  
      // Get team members in a separate query
      const { data: members, error: membersError } = await supabase
        .from("team_members")
        .select(`
          *, 
          user:user_id(id, fullname, username, profile_pic, slug)
        `)
        .eq("team_id", team.id);
  
      if (membersError) throw membersError;
  
      // Combine the results
      team.members = members || [];
  
      return { success: true, team };
    } catch (error) {
    //   console.log("Error fetching team details:", error);
      return { success: false, error: error.message };
    }
  }
  
  export async function updateTeamDetails(slug, updatedData) {
    if (!slug || !updatedData || Object.keys(updatedData).length === 0) {
      return { success: false, error: "No fields are changed to update the team" };
    }
  
    try {
      // Convert camelCase to snake_case for database fields
      const dbFields = {};
      Object.entries(updatedData).forEach(([key, value]) => {
        if (key === "profilePic") {
          dbFields["profile_pic"] = value;
        } else if (key === "ownerId") {
          dbFields["owner_id"] = value;
        } else {
          dbFields[key] = value;
        }
      });
  
      const { data: updatedTeam, error } = await supabase
        .from("teams")
        .update(dbFields)
        .eq("slug", slug)
        .select()
        .single();
  
      if (error) throw error;
  
      return { success: true, team: updatedTeam };
    } catch (error) {
    //   console.log("Error updating team:", error);
      return { success: false, error: error.message };
    }
  }
  
  export async function createTeamJoinRequest(senderId, teamId) {
    if (!senderId || !teamId) {
      return { success: false, error: "Sender ID and Team ID are required" };
    }
  
    try {
      // Check if there's already a pending request from this user to this team
      const { data: existingRequest, error: existingError } = await supabase
        .from("team_join_requests")
        .select("id")
        .eq("sender_id", senderId)
        .eq("team_id", teamId)
        .eq("status", "pending")
        .limit(1);
  
      if (existingError) throw existingError;
  
      if (existingRequest && existingRequest.length > 0) {
        return { 
          success: false, 
          error: "You already have a pending join request for this team" 
        };
      }
  
      // Create the join request if no pending request exists
      const { data: joinRequest, error } = await supabase
        .from("team_join_requests")
        .insert([{
          sender_id: senderId,
          team_id: teamId,
        }])
        .select()
        .single();
  
      if (error) throw error;
  
      return { success: true, joinRequest };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  export async function getTeamJoinRequestsByUser(userId) {
    if (!userId) {
      return { success: false, error: "User ID is required" };
    }
  
    try {
      const { data: joinRequests, error } = await supabase
        .from("team_join_requests")
        .select(`
          *,
          team:team_id(id, name)
        `)
        .eq("sender_id", userId);
  
      if (error) throw error;
  
      return { success: true, joinRequests };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  export async function getTeamJoinRequests(teamId) {
    if (!teamId) {
      return { success: false, error: "Team ID is required" };
    }
  
    try {
      const { data: joinRequests, error } = await supabase
        .from("team_join_requests")
        .select(`
          *,
          sender:sender_id(id, username, profile_pic)
        `)
        .eq("team_id", teamId);
  
      if (error) throw error;
  
      return { success: true, joinRequests };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  export async function getTeamsByUserId(userId) {
    if (!userId) {
      return { success: false, error: "User ID is required" };
    }
  
    try {
      // First find all teams where user is a member
      const { data: memberTeams, error: memberError } = await supabase
        .from("team_members")
        .select("team_id")
        .eq("user_id", userId);
  
      if (memberError) throw memberError;
  
      const teamIds = memberTeams ? memberTeams.map(t => t.team_id) : [];
  
      // Then find teams where user is an owner
      const { data: ownedTeams, error: ownerError } = await supabase
        .from("teams")
        .select("id")
        .eq("owner_id", userId);
  
      if (ownerError) throw ownerError;
  
      if (ownedTeams) {
        ownedTeams.forEach(team => {
          if (!teamIds.includes(team.id)) {
            teamIds.push(team.id);
          }
        });
      }
  
      // If user has no teams, return empty array
      if (teamIds.length === 0) {
        return { success: true, teams: [] };
      }
  
      // Get detailed team information for all team IDs
      const { data: teams, error: teamsError } = await supabase
        .from("teams")
        .select("*")
        .in("id", teamIds);
  
      if (teamsError) throw teamsError;
  
      // Get members for each team
      const teamsWithMembers = await Promise.all((teams || []).map(async (team) => {
        const { data: members } = await supabase
          .from("team_members")
          .select(`
            user_id, role,
            user:user_id(id, username, profile_pic)
          `)
          .eq("team_id", team.id);
        
        return {
          ...team,
          members: members || []
        };
      }));
  
      return { success: true, teams: teamsWithMembers };
    } catch (error) {
    //   console.log("Error fetching teams:", error);
      return { success: false, error: error.message };
    }
  }
  
  export async function updateJoinRequestStatus(requestId, status) {
    if (!requestId || !status) {
      return { success: false, error: "Request ID and status are required" };
    }
    
    // Simulate delay like in the original
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    try {
      const { data: updatedRequest, error } = await supabase
        .from("team_join_requests")
        .update({ status })
        .eq("id", requestId)
        .select()
        .single();
  
      if (error) throw error;
  
      return { success: true, joinRequest: updatedRequest };
    } catch (error) {
    //   console.log("Error updating join request status:", error);
      return { success: false, error: error.message };
    }
  }
  
  export async function addUserToTeam(teamId, userId) {
    if (!teamId || !userId) {
      return { success: false, error: "Team ID and User ID are required" };
    }
  
    try {
      const { data: newMember, error } = await supabase
        .from("team_members")
        .insert([{
          team_id: teamId,
          user_id: userId,
          role: 'player',
          is_admin: false,
        }])
        .select()
        .single();
  
      if (error) throw error;
  
      return { success: true, teamMember: newMember };
    } catch (error) {
    //   console.log("Error adding user to team:", error);
      return { success: false, error: error.message };
    }
  }
  
  export async function isUserTeamMember(teamId, userId) {
    if (!teamId || !userId) {
      return { success: false, error: "Team ID and User ID are required" };
    }
  
    try {
      const { data: member, error } = await supabase
        .from("team_members")
        .select("id")
        .eq("team_id", teamId)
        .eq("user_id", userId)
        .limit(1);
  
      if (error) throw error;
  
      return { success: true, isMember: member && member.length > 0 };
    } catch (error) {
    //   console.log("Error checking team membership:", error);
      return { success: false, error: error.message };
    }
  }
  
  export async function sendLiveChatMessage(senderId, content, contextType, contextId, repliedToId = null) {
    try {
      const { data: newMessage, error } = await supabase
        .from("live_chat_messages")
        .insert([{
          content,
          sender_id: senderId,
          replied_to_id: repliedToId,
          context_type: contextType,
          context_id: contextId
        }])
        .select(`
          *,
          sender:sender_id(id, username, profile_pic),
          repliedTo:replied_to_id(id, username)
        `)
        .single();
      
      if (error) throw error;
      
      return { success: true, message: newMessage };
    } catch (error) {
    //   console.log("Error sending live chat message:", error);
      return { success: false, error: "Failed to send message" };
    }
  }
  
  export async function getLiveChatMessages(contextType, contextId, limit = 100) {
    try {
      const { data: messages, error } = await supabase
        .from("live_chat_messages")
        .select(`
          *,
          sender:sender_id(id, username, profile_pic),
          repliedTo:replied_to_id(id, username)
        `)
        .eq("context_type", contextType)
        .eq("context_id", contextId)
        .order("created_at", { ascending: true })
        .limit(limit);
      
      if (error) throw error;
      
      return { success: true, messages };
    } catch (error) {
    //   console.log("Error fetching live chat messages:", error);
      return { success: false, error: "Failed to fetch messages" };
    }
  }
  
  export async function getAnnouncements(contextType, contextId) {
    try {
      const { data: announcements, error } = await supabase
        .from("announcements")
        .select(`
          *,
          sender:sender_id(id, username, profile_pic)
        `)
        .eq("context_type", contextType)
        .eq("context_id", contextId)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      return { success: true, announcements };
    } catch (error) {
    //   console.log("Error fetching announcements:", error);
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
      const { data: announcement, error } = await supabase
        .from("announcements")
        .insert([{
          title: announcementData.title,
          content: announcementData.content,
          important: !!announcementData.important,
          sender_id: announcementData.senderId,
          context_type: announcementData.contextType,
          context_id: announcementData.contextId
        }])
        .select()
        .single();
  
      if (error) throw error;
  
      // Broadcast using Supabase's Realtime feature
      const channelId = `${announcementData.contextType}-${announcementData.contextId}`;
      
      // Get sender info for broadcasting
      const { data: sender } = await supabase
        .from("user_profiles")
        .select("username, profile_pic")
        .eq("id", announcementData.senderId)
        .single();
      
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
          sender: sender?.username || "Admin",
          senderAvatar: sender?.profile_pic,
          createdAt: announcement.created_at
        }
      });
  
      return {
        success: true,
        announcement
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }