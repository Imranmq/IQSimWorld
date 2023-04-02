export function checkHealthUpdate(stats, healthLossCheck) {
  for (let key in healthLossCheck) {
    if (!healthLossCheck.hasOwnProperty(key)) continue;
    stats.health += healthLossCheck[key](stats[key]);
  }
}
