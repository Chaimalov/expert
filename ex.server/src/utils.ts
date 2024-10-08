export const avgArrayOfNumbers = (numbersArray: number[]) => {
  return (
    numbersArray.reduce((sum, number) => sum + number, 0) / numbersArray.length
  );
};


export const addDaysToDate = (date: Date, days: number) => {
  return new Date(date.setDate(date.getDate() + days));
};