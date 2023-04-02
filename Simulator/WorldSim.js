import { buildingTypes } from "../Buildings/Types/BuildingsTypes.js";
import { PopulationTypes } from "../Population/Types/PopTypes.js";

export default class WorldSimulator {
  constructor(world, simulateTime = 5000) {
    this.simulateTime = simulateTime;
    this.world = world;
    this.simulatorMethod = this.simulatorMethod.bind(this);
    this.nextJ = "J0";
  }
  simulatorMethod() {
    if (!this.world) console.log("World not found");
    this.world.runTick();
    this.createHouseWhenEnoughWood("H0");
    this.addPopWhenFoodMaxGoes("P0");
  }

  createHouseWhenEnoughWood(c) {
    if (
      this.world.worldStats[buildingTypes[c].resource[0].name] >=
      buildingTypes[c].resource[0].num
    ) {
      this.world.possibleEvents.addBuild(c);
    }
  }
  addPopWhenFoodMaxGoes(c) {
    if (
      this.world.worldStats.population === 0 ||
      this.world.worldStats.food / this.world.worldStats.population > 3
    ) {
      let J0Pop = this.world.population.filter((p) => p.workJobCode === "J0")
        .length;
      this.nextJ = (J0Pop / this.world.population.length) * 100 > 70 ? "J1" : "J0";
      this.world.possibleEvents.addPop(c, this.nextJ);
    }
  }
  attachSimulateWithTime() {
    setInterval(this.simulatorMethod, this.simulateTime);
  }
}
