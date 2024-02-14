'use strict'

// Main entry point of the app
import { fetchTeamData, fetchTeamMembers } from 'api'
import { setTeamError } from 'team'
import { setActiveMember } from 'member'
import {
  initTabs,
  initNavigation,
  setActiveTab,
  setNavigationLoading,
  setNavigationError,
} from 'navigation'

// Loads data in the app
async function loadData() {
  setNavigationLoading()
  document.getElementById('team-error').innerHTML = ''
  const team = await fetchTeamData()
  if (!team) setTeamError(loadData)
  const members = await fetchTeamMembers(team)
  console.log('members', members)
  if (members?.length) initNavigation(members)
  else setNavigationError()

  const url = new URL(window.location)
  const member = members?.find((member) =>
    url.hash.startsWith(`#/${member.firstName}`)
  )
  if (member) {
    setActiveMember(member)
    setActiveTab(
      url.hash.split('/').pop()?.replace(member.firstName, '') || 'about'
    )
  } else {
    url.hash = ''
    window.history.pushState(null, '', url.toString())
  }
}

initTabs()
loadData()
