import { PopulationTypes } from "../../Population/Types/PopTypes.js";
import { guid } from "../../Utils/UUID.js";
import { jobTypes } from "../../Jobs/Types/JobTypes.js";

export function addPopulation(type, job, worldArgs) {
  const {
    worldStats,
    population,
    buildings,
    possibleJobEvents,
    possiblePopEvents,
  } = worldArgs;
  if (!type) type = "Human";
  let popTypeBlueprint = PopulationTypes[type];
  if (!popTypeBlueprint) {
    console.log(`Population type ${type} not found`);
    return;
  }
  if (worldStats.food < popTypeBlueprint.reqFood) {
    console.log(
      "not enough food",
      `need ${popTypeBlueprint.reqFood - worldStats.food} food`
    );
    return;
  }
  let hWithSpace = buildings.residential.find(
    (h) =>
      popTypeBlueprint.buildings.find((ab) => ab === h.name) && h.emptySlots > 0
  );
  if (!hWithSpace) {
    console.log("no house or no empty slot available");
    return;
  }
  // consume food
  possiblePopEvents.takeFood(popTypeBlueprint.reqFood);
  // create new pop if house space is available
  let newPop = new popTypeBlueprint.classItem();
  newPop.worldMethods = possiblePopEvents;
  newPop.id = guid();
  // assign job if job type is set and found
  let jobBPrint = jobTypes[job];
  if (jobBPrint) {
    let newJob = new jobBPrint.classItem();
    newJob.id = guid();
    newJob.worldMethods = possibleJobEvents;
    newPop.workJob = newJob;
    newPop.workJobCode = job;
  }
  // adjust world stats
  worldStats.capacity--;
  worldStats.population++;
  population.push(newPop);
  // fill house with space
  hWithSpace.emptySlots--;
  hWithSpace.residence.push(newPop.id);
  return newPop;
}
