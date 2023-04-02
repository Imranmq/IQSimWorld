import { buildingTypes } from "../../Buildings/Types/BuildingsTypes.js";
import { guid } from "../../Utils/UUID.js";

export function addBuilding(type, worldStats, buildings) {
  let bPrint = buildingTypes[type];
  if (!bPrint) {
    console.log(`building type of ${type} is not available`);
    return;
  }
  // check if resource requirement meet
  let notMatch = bPrint.resource.find((r) => worldStats[r.name] < r.num);
  if (notMatch) {
    console.log(
      `need ${notMatch.num - worldStats[notMatch.name]} more ${notMatch.name}`
    );
    return;
  }
  // create new build;
  let newBuild = new bPrint.classItem(bPrint.capacity);
  newBuild.id = guid();
  buildings[bPrint.category].push(newBuild);
  // add world Stats capacity;
  worldStats.capacity += bPrint.capacity;
  // remove resources from worldStats;
  bPrint.resource.map((r) => (worldStats[r.name] -= r.num));
}
