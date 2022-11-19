export const sortBy = (list, prop) => {
  return list.sort((current, next) => (current[prop] < next[prop] ? -1 : 1));
};

export const sortObjectByDateKeys = (object) =>
  Object.keys(object)
    .sort((current, next) => Date.parse(current) - Date.parse(next))
    .reduce((sorted, item) => ((sorted[item] = object[item]), sorted), {});

export const addDaysToDate = (date, days) => {
  return new Date(date.setDate(date.getDate() + days));
};

export const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
