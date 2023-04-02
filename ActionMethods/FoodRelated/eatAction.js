export const eatAction = function (inventory, stats, eatCount) {
  if (inventory && inventory.food && inventory.food[0]) {
    let fItem = inventory.food[0];
    if (fItem.count == 1) inventory.food.shift();
    fItem.count -= eatCount ? eatCount : 1;
    if (stats.hunger > 1) stats.hunger -= 2;
    else stats.hunger = 0;
  } else {
    stats.hunger++;
  }
};
