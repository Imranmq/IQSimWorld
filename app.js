import World from "./World/World.js";
import WorldSimulator from "./Simulator/WorldSim.js";
import { addBuilding } from "./World/CreateMethods/AddBuilding.js";

const debugMode = {
  pop: true,
};
let newWorld = new World(debugMode);

// sample initial state to make it operational
let newWorldStats = { wood: 10, food: 6, capacity: 0, population: 0 };
let newWorldInventory = { food: [{ code: "FR0", count: 6 }] };
let newWorldBuilding = { residential: [] };
addBuilding("H0", newWorldStats, newWorldBuilding);

newWorld.loadInitialState(
  newWorldStats,
  null,
  newWorldBuilding,
  newWorldInventory
);
const ws1 = new WorldSimulator(newWorld, 1000);
ws1.attachSimulateWithTime();
console.log(Math.floor(Math.random() * 3) + 1);
