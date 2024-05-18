import { Product } from "../../../ex.common";

export const sortBy = <K extends string, T extends Record<K, unknown>[]>(
  list: T,
  prop: K
) => {
  return list.sort((current, next) => (current[prop] < next[prop] ? -1 : 1));
};

export const sortObjectByDateKeys = <T>(object: Record<string, T>) =>
  Object.keys(object)
    .sort((current, next) => Date.parse(current) - Date.parse(next))
    .reduce(
      (sorted: Record<string, T>, item) => (
        (sorted[item] = object[item]), sorted
      ),
      {}
    );

export const addDaysToDate = (date: Date, days: number) => {
  return new Date(date.setDate(date.getDate() + days));
};

export const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const groupProductsByExpirationDate = (products: Product[]) => {
  return products
    .filter((product) => product.createdAt)
    .reduce((groups: Record<string, Product[]>, product) => {
      const date = new Date(product.expiryDate).toString();

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(product);

      return groups;
    }, {});
};
