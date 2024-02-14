"use strict";

import { setActivePage } from "navigation";

/**
 * Fills the stats article with stats data
 * @param {{title: string; value: string}[]} stats The stats to display
 */
const setStats = (stats = []) => {
  const statsContainer = document.getElementById("stats");
  statsContainer.innerHTML = "<h2>Stats</h2>";
  stats.forEach((stat) => {
    const label = document.createElement("label");
    label.htmlFor = stat.title.toLowerCase();
    label.textContent = `${stat.title}:`;
    const meter = document.createElement("meter");
    meter.id = stat.title.toLowerCase();
    meter.value = stat.value;
    meter.max = 100;
    meter.textContent = `${stat.value}%`;
    statsContainer
      .appendChild(document.createElement("div"))
      .append(label, meter);
  });
};

/**
 * Fills the habitats article with habitats data
 * @param {{title: string; value: string}[]} habitats The habitats to display
 */
const setHabitats = (habitats = []) => {
  const habitatArticle = document.getElementById("habitats");
  habitatArticle.innerHTML = "<h2>Habitats</h2>";
  const list = document.createElement("ul");
  habitats.forEach((habitat) => {
    const habitatItem = document.createElement("li");
    if (habitat.value.startsWith("https")) {
      const habitatLink = document.createElement("a");
      habitatLink.href = habitat.value;
      habitatLink.textContent = habitat.title;
      habitatItem.appendChild(habitatLink);
    } else {
      habitatItem.textContent = `${habitat.title}: ${habitat.value}`;
    }
    list.appendChild(habitatItem);
  });
  habitatArticle.appendChild(list);
};

/**
 * Fills the page with the active member's data
 * @param {{
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
 * } | undefined} member The member to display
 */
export const setActiveMember = (member) => {
  document.body.style.backgroundColor =
    member?.favoritePokemonColor ?? "#fbd743";
  setActivePage(member?.firstName);

  // Set member avatar
  const avatar = document.querySelector("#about img");
  avatar.src = member?.avatar_url;
  avatar.alt = member?.firstName;

  // Set member bio
  const bio = document.querySelector("#about p");
  bio.innerHTML = member?.bio;

  // Set member stats and habitats
  setStats(member?.stats);
  setHabitats(member?.habitat);
};
