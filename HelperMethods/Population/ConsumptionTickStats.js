export const commonConsumptionStats = function (stats, consumption) {
  for (let key in consumption) {
    if (!consumption.hasOwnProperty(key)) continue;
    stats[key] -= consumption[key];
  }
};