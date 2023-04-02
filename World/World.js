import { addPopulation } from "./CreateMethods/AddPopulation.js";
import { addBuilding } from "./CreateMethods/AddBuilding.js";

class World {
  constructor(debug) {
    this.worldStats = { wood: 0, food: 0, capacity: 0, population: 0 };
    this.population = [];
    this.buildings = {
      residential: [],
    };

    this.inventory = {
      wood: [],
      food: [],
    };

    this.possibleEvents = {
      addPop: this.addPopulationMethod,
      addBuild: this.addBuildingMethod,
    };

    this.possibleJobEvents = {
      addFood: this.addFood,
      addResource: this.addResource,
    };

    this.possiblePopEvents = {
      takeFood: this.takeFood,
    };
    // temp num to increment and assign the name until name generator is built
    this.humanNumId = 0;

    this.possibleEvents.addPop = this.possibleEvents.addPop.bind(this);
    this.possibleEvents.addBuild = this.possibleEvents.addBuild.bind(this);

    this.possiblePopEvents.takeFood = this.possiblePopEvents.takeFood.bind(
      this
    );

    this.possibleJobEvents.addFood = this.possibleJobEvents.addFood.bind(this);
    this.possibleJobEvents.addResource = this.possibleJobEvents.addResource.bind(
      this
    );

    this.debugMode = debug;
  }

  loadInitialState(worldStats, population, buildings, inventory) {
    if (worldStats) this.worldStats = worldStats;
    if (population) this.population = population;
    if (buildings) this.buildings = buildings;
    if (inventory) this.inventory = inventory;
  }
  addResource(count, rItem) {
    this.worldStats[rItem.name] += count;
  }
  addFood(count, codeItem) {
    let foodCodeExist = this.inventory.food.find(
      (fc) => fc.code === codeItem.code
    );
    if (foodCodeExist) {
      foodCodeExist.count += count;
    } else {
      this.inventory.food.push({ ...codeItem, count: count });
    }
    this.worldStats.food += count;
  }
  takeFood(count) {
    let foodItems = [];
    let need = count;
    let fItems = this.inventory.food.filter((fI) => fI.count > 0);
    let fItemsLength = fItems.length;
    for (let i = 0; i < fItemsLength && need > 0; i++) {
      // take copy of the object
      let fItemTake = { ...fItems[i] };
      // calculate the amount to take
      let takeAmount = fItems[i].count > need ? need : fItems[i].count;
      fItemTake.count = takeAmount;
      fItems[i].count -= takeAmount;
      need -= takeAmount;
      this.worldStats.food -= takeAmount;
      foodItems.push(fItemTake);
    }
    return foodItems;
  }

  runTick() {
    for (let pop of this.population) {
      pop.runTick();
      if (this.debugMode && this.debugMode.pop) {
        // debug pop info
        let fc = 0;
        pop.inventory.food.map((f) => (fc += f.count));
        console.log(pop.name);
        console.log(
          `Stats: F: ${fc} HU:${pop.stats.hunger} E:${pop.stats.energy} HL :${pop.stats.health}`
        );
      }
    }
    if (this.debugMode) {
      console.log(
        `w:${this.worldStats.wood}, f:${this.worldStats.food}, c:${this.worldStats.capacity}, p:${this.worldStats.population}`
      );
    }
  }

  addBuildingMethod(type) {
    addBuilding(type, this.worldStats, this.buildings);
  }
  addPopulationMethod(type, job) {
    let newPop = addPopulation(type, job, {
      worldStats: this.worldStats,
      population: this.population,
      buildings: this.buildings,
      possibleJobEvents: this.possibleJobEvents,
      possiblePopEvents: this.possiblePopEvents,
    });
    if (newPop) {
      // temp increment name assignment
      newPop.name += this.humanNumId;
      this.humanNumId++;
    }
  }
}
export default World;
