/**
 * Fetches local team data from ./team.json
 * @returns {Promise<{
 * title: string
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
    const response = await fetch(`${personalPage}/me.json`);
    return response.json();
  } catch (e) {
    console.error(e);
  }
};
