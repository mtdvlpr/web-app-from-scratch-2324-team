// Main entry point of the app
import { fetchTeamData } from "api";
import { setTeamInfo } from "team";

// Loads data in the app
async function loadData() {
  const result = await fetchTeamData();
  setTeamInfo(result);
}

loadData();
