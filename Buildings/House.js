import { guid } from "../Utils/UUID.js";

export default class House {
  constructor(capacity) {
    this.id = guid();

    this.name = "House";
    this.emptySlots = capacity;
    this.residence = [];
  }
}
