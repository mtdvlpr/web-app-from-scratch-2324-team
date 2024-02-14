"use strict";

// Main entry point of the app
import { fetchTeamData, fetchTeamMembers } from "api";
import { setActiveMember } from "member";
import {
  initTabs,
  initNavigation,
  setActiveTab,
  setNavigationLoading,
} from "navigation";

// Loads data in the app
async function loadData() {
  setNavigationLoading();
  const team = await fetchTeamData();
  const members = await fetchTeamMembers(team);
  initNavigation(members);

  const url = new URL(window.location);
  const member = members.find((member) =>
    url.hash.startsWith(`#/${member.firstName}`)
  );
  if (member) {
    setActiveMember(member);
    setActiveTab(
      url.hash.split("/").pop()?.replace(member.firstName, "") || "about"
    );
  } else {
    url.hash = "";
    window.history.pushState(null, "", url.toString());
  }
}

initTabs();
loadData();
