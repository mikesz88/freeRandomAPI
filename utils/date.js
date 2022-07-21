const subtractYears = (numOfYears, date) => {
  date.setFullYear(date.getFullYear() - numOfYears);

  return date;
};

module.exports = subtractYears;