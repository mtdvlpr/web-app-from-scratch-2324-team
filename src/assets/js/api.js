/**
 * Fetches local team data from ./team.json
 * @returns {Promise<{
 * title: string
 * members: {name: string; github: string}[]
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
 * @param {string} github The GitHub username of the team member
 * @returns {Promise<*>} The fetched data
 */
export const fetchPersonData = async (github) => {
  try {
    const response = await fetch(
      `https://${github}.github.io/web-app-from-scratch-2324/me.json`
    );
    return response.json();
  } catch (e) {
    console.error(e);
  }
};
