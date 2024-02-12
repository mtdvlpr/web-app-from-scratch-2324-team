"use strict";

/**
 * Loads the team info into the app
 * @param {{
 * name: string
 * members: {name: string; personalPage: string}[]
 * }} info
 */
export const setTeamInfo = (info) => {
  const title = document.getElementById("title");
  title.textContent = info.name;

  const list = document.createElement("ul");
  info.members.forEach((member) => {
    const listItem = document.createElement("li");
    listItem.textContent = member.name;
    list.appendChild(listItem);
  });

  const container = document.getElementById("member-container");
  container.innerHTML = "";
  container.appendChild(list);
};
