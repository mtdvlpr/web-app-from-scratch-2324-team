"use strict";

import { setActiveMember } from "member";

// Constants
const DETAIL_ARTICLES = ["about", "stats", "habitats"];

/**
 * Fills the main navigation with members
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
 * }[]} members The members to load
 */
export const initNavigation = (members) => {
  const list = document.createElement("ul");

  members.forEach((member) => {
    const listItem = document.createElement("li");

    const link = document.createElement("a");
    link.href = `#/${member.firstName}/about`;
    link.onclick = () => {
      setActiveMember(member);
      setActiveTab("about");
    };

    const img = document.createElement("img");
    img.src = member.favoritePokemonAvatar;
    img.alt = member.firstName;

    link.appendChild(img);
    listItem.appendChild(link);
    list.appendChild(listItem);
  });

  const container = document.getElementById("nav-main");
  container.innerHTML = "";
  container.appendChild(list);
};

/**
 * Sets the active page
 * @param {string | undefined} page The page to display
 */
export const setActivePage = (page) => {
  setURL({ page });

  // Set active state for navigation items
  const navItems = document.querySelectorAll("#nav-main a");
  navItems.forEach((navItem) => {
    navItem.classList.toggle(
      "active",
      navItem.getAttribute("href").startsWith(`#/${page}`)
    );
  });

  // Update tab links
  const tabs = document.querySelectorAll("#nav-sub a");
  tabs.forEach((tab) => {
    tab.href = `#/${page}/${tab.textContent.toLowerCase()}`;
  });

  // Show/hide team article and tabs
  const teamContainer = document.getElementById("team");
  teamContainer.classList.toggle("active", !page);
  const subNav = document.getElementById("nav-sub");
  subNav.classList.toggle("active", !!page);
  if (!page) setActiveTab("");
};

/**
 * Initializes the click events for the tabs
 */
export const initTabs = () => {
  const tabs = document.querySelectorAll("#nav-sub a");
  tabs.forEach((tab) => {
    tab.onclick = () => setActiveTab(tab.textContent.toLowerCase());
  });
};

/**
 * Sets the active tab
 * @param {string} tab The tab to activate
 */
export const setActiveTab = (tab) => {
  setURL({ tab });
  DETAIL_ARTICLES.forEach((article) => {
    const element = document.getElementById(article);
    element.classList.toggle("active", article === tab);
  });
};

/**
 * Sets the current URL
 * @param {{page?: string; tab?: string; home?: boolean}} param0 The page and tab to set
 */
export const setURL = ({ page, tab } = {}) => {
  const url = new URL(window.location);
  const [currentPage, currentTab] = url.hash.substring(2).split("/");
  url.hash = page || tab ? `#/${page ?? currentPage}/${tab ?? currentTab}` : "";
  window.history.pushState(null, "", url.toString());
};

/**
 * Sets the navigation to loading state
 */
export const setNavigationLoading = () => {
  const navItems = document.querySelectorAll("#nav-main a");
  const pokeballTemplate = document.getElementById("pokeball-loader");
  navItems.forEach((navItem) => {
    navItem.innerHTML = pokeballTemplate.innerHTML;
  });
};
