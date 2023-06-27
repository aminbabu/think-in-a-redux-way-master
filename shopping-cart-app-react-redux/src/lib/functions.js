export const generateID = (arr) =>
  arr.reduce((maxID, item) => Math.max(item.id, maxID), -1) + 1;
