import { foodCodes } from "../ItemCodes/FoodCodes.js";

export default class Gatherer {
  constructor() {
    this.fatigue = 3;
    this.worldMethods = null;

    this.id = null;

    this.possibleFood = [
      { code: "FR0", name: foodCodes.FR0 },
      { code: "FR1", name: foodCodes.FR1 },
      { code: "FR2", name: foodCodes.FR2 },
    ];
    this.executeJob = this.executeJob.bind(this);

    this.addFoodPerShift = 4;
  }

  executeJob() {
    if (!this.worldMethods) {
      console.log("World Method should be passed to the job", this.id);
      return 0;
    }
    let randomIndex = Math.floor(Math.random() * 2) + 1;

    this.worldMethods.addFood(
      this.addFoodPerShift,
      this.possibleFood[randomIndex]
    );
    return { fatigue: 3 };
  }
}
