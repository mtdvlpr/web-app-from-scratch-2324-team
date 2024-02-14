"use strict";

/**
 * Fetches local team data from ./team.json
 * @returns {Promise<{
 * teamName: string
 * members: {name: string; personalPage: string}[]
 * }>} The fetched data
 */
export async function fetchTeamData() {
  try {
    const response = await fetch("./team.json");
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}

/**
 * Fetches personal data from a team member
 * @param {string} personalPage The URL of the personal page of the member
 * @returns {Promise<*>} The fetched data
 */
export const fetchPersonData = async (personalPage) => {
  try {
    const response = await fetch(
      `${personalPage}${personalPage.endsWith("/") ? "" : "/"}info.json`
    );
    return response.json();
  } catch (e) {
    console.error(e);
  }
};

export const fetchTeamMembers = async (team) => {
  const promises = [];
  team.members.forEach((member) => {
    promises.push(fetchPersonData(member.personalPage));
  });

  const members = [];
  const result = await Promise.allSettled(promises);
  result.forEach((memberResult) => {
    if (memberResult.status === "fulfilled") {
      members.push(memberResult.value);
      console.log("member", memberResult.value);
    }
  });
  return members;
};
