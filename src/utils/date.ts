export const subtractYears = (numOfYears: number, date: Date) => {
  date.setFullYear(date.getFullYear() - numOfYears);

  return date;
}