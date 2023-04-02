import House from "../House.js";

export const buildingTypes = {
  H0: {
    name: "House",
    classItem: House,
    capacity: 4,
    category: "residential",
    resource: [{ name: "wood", num: 10 }],
  },
};
