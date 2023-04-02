import { commonConsumptionStats } from "../HelperMethods/Population/ConsumptionTickStats.js";
import { eatAction } from "../ActionMethods/FoodRelated/eatAction.js";
import { checkHealthUpdate } from "../ActionMethods/Common/HealthAction.js";
import { shiftAction } from "../HelperMethods/Shift/shiftAction.js";

export default class Human {
  constructor() {
    this.id = "";
    this.name = "Imran";
    this.healthLossStats = {
      hunger: (h) => (h > 3 ? -1 : 0),
      energy: (e) => (e < 0 ? -1 : 0),
    };
    this.stats = {
      health: 10,
      hunger: 0,
      energy: 12,
    };

    this.consumptionStats = {
      hunger: -1,
      energy: 1,
    };

    this.workJob = null;
    this.workJobCode = "";

    this.inventory = { food: [] };
    // each day has 3 shifts
    this.shift = 0;

    // shift operations
    this.shifts = {
      0: { work: true },
      1: { work: true },
      2: { work: false, sleep: true },
    };
  }

  runTick() {
    this.tickStats();
    // if inventory is low take more food from world
    this.checkInventory();
    // perform Actions
    eatAction(this.inventory, this.stats);
    // check for all healthLoss stats
    checkHealthUpdate(this.stats, this.healthLossStats);
    // TODO : check if health is less then 0 , kill the pop
    this.killThisPop();
    // reset shift back to start of day
    this.processCurrentShift();
    this.shift = shiftAction(this.shift);
  }

  killThisPop() {
    // clear any actions that this pop is doing
    // call the world method for dead population
  }

  tickStats(tickStats) {
    if (!tickStats) tickStats = this.consumptionStats;
    commonConsumptionStats(this.stats, tickStats);
  }
  processCurrentShift() {
    let currentShift = this.shifts[this.shift];
    if (currentShift.sleep) {
      this.stats.energy = 12;
      return;
    }
    if (currentShift.work && this.workJob) {
      let afterEffect = this.workJob.executeJob();
      if (afterEffect) {
        this.stats.energy -= afterEffect.fatigue;
      }
    }
  }

  checkInventory() {
    if (this.inventory.food?.length < 2) {
      let foodItems = this.worldMethods.takeFood(6);
      foodItems.map((fi) => this.inventory.food.push(fi));
    }
  }
}
