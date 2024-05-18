import { Product } from "../../../ex.common";
import { ExpertUser } from "../context";

export function calcDays(date: number) {
  const days = Math.round(date % 30);
  const months = Math.round((date / 30) % 12);
  const years = Math.round(date / 30 / 12);

  return { days, months, years };
}

export function displayDays(days: number) {
  const date = calcDays(days);

  if (date.years) {
    return `${date.years} ${date.years > 1 ? "years" : "year"}`;
  }

  if (date.months) {
    if (date.days > 15) date.months++;
    return `${date.months} ${date.months > 1 ? "months" : "month"}`;
  }

  return `${date.days} ${date.days > 1 ? "days" : "day"}`;
}

export const isInUsersList = (user: ExpertUser, item: Product): boolean => {
  return Boolean(user.products && item.createdAt);
};
