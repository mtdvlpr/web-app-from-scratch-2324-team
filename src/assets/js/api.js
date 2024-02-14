'use strict'

/**
 * Fetches local team data from ./team.json
 * @returns {Promise<{
 * teamName: string
 * members: {name: string; personalPage: string}[]
 * }>} The fetched data
 */
export async function fetchTeamData() {
  try {
    const response = await fetch('./team.json')
    return await response.json()
  } catch (e) {
    console.error(e)
  }
}

/**
 * Fetches personal data from a team member
 * @param {string} personalPage The URL of the personal page of the member
 * @returns {Promise<{
 * firstName: string
 * lastName: string
 * avatar_url: string
 * age: number
 * bio: string
 * stats: {title: string; value: number}[]
 * strengths: string[]
 * weaknesses: string[]
 * habitat: {title: string; value: number}[]
 * favoritePokemon: string
 * favoritePokemonAvatar: string
 * favoritePokemonColor: string
 * }>} The fetched data
 */
export const fetchPersonData = async (personalPage) => {
  try {
    const response = await fetch(
      `${personalPage}${personalPage.endsWith('/') ? '' : '/'}info.json`
    )
    return response.json()
  } catch (e) {
    console.error(e)
  }
}

/**
 * Fetches personal data from each team member
 * @param {{
 * teamName: string
 * members: {name: string; personalPage: string}[]
 * }} team The team object
 * @returns {Promise<{
 * firstName: string
 * lastName: string
 * avatar_url: string
 * age: number
 * bio: string
 * stats: {title: string; value: number}[]
 * strengths: string[]
 * weaknesses: string[]
 * habitat: {title: string; value: number}[]
 * favoritePokemon: string
 * favoritePokemonAvatar: string
 * favoritePokemonColor: string
 * }[]>} The team members data
 */
export const fetchTeamMembers = async (team) => {
  const members = []
  team?.members?.forEach((member) => {
    members.push({
      name: member.name,
      promise: fetchPersonData(member.personalPage),
    })
  })

  const result = await Promise.allSettled(members.map((p) => p.promise))
  return result.map((promise, index) => {
    if (promise.status === 'fulfilled' && promise.value) {
      return promise.value
    }
    return { firstName: team.members[index].name }
  })
}
