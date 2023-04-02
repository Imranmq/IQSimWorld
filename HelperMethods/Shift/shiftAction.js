export function shiftAction(shift) {
  if (shift === 2) shift = 0;
  else shift++;
  return shift;
}
