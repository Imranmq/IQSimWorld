export default class LumberJack {
  constructor() {
    this.fatigue = 5;
    this.worldMethods = null;

    this.id = null;
    this.executeJob = this.executeJob.bind(this);
  }
  executeJob() {
    if (!this.worldMethods) {
      console.log("World Method should be passed to the job", this.id);
      return 0;
    }

    this.worldMethods.addResource(1, { name: "wood" });
    return { fatigue: 3 };
  }
}
