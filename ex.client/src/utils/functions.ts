export const sortBy = <K extends string, T extends Record<K, unknown>[]>(list: T, prop: K) => {
  return list.sort((current, next) => (current[prop] < next[prop] ? -1 : 1));
};

export const sortObjectByDateKeys = (object: Record<string, unknown>) =>
  Object.keys(object)
    .sort((current, next) => Date.parse(current) - Date.parse(next))
    .reduce((sorted: Record<string, unknown>, item) => ((sorted[item] = object[item]), sorted), {});

export const addDaysToDate = (date: Date, days: number) => {
  return new Date(date.setDate(date.getDate() + days));
};

export const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
