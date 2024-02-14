"use strict";

// Main entry point of the app
import { fetchTeamData, fetchTeamMembers } from "api";
import { setActiveMember } from "member";
import { initTabs, initNavigation, setActiveTab } from "navigation";

// Loads data in the app
async function loadData() {
  const team = await fetchTeamData();
  const members = await fetchTeamMembers(team);
  initNavigation(members);

  const url = new URL(window.location);
  const member = members.find((member) =>
    url.hash.startsWith(`#/${member.firstName}`)
  );
  console.log("member", member);
  console.log("hash", url.hash);
  console.log("tab", url.hash.split("/").pop());
  if (member) {
    setActiveMember(member);
    setActiveTab(url.hash.split("/").pop());
  } else {
    url.hash = "";
    window.history.pushState(null, "", url.toString());
  }
}

initTabs();
loadData();
