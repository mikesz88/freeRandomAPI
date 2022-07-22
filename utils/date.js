/* function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
 */
// const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

// const subtractYears = (numOfYears) => randomDate(new Date((new Date().getFullYear() - numOfYears), 0, 1), new Date())

const randomMonthAndNumber = () => {
  const not30 = [0,2,4,6,7,9,11]
  const month = Math.floor(Math.random() * 12)
  const day = not30.includes(month) 
  ? Math.floor(Math.random() * 31)
  : month === 1
  ? Math.floor(Math.random() * 28)
  : Math.floor(Math.random() * 30)
  return [month, day]
}

const subtractYears = (numOfYears) => {
  // randomDate(new Date((new Date().getFullYear() - numOfYears), 0, 1), new Date())
  const monthDay = randomMonthAndNumber();
  const newYear = new Date(Date.now()).getFullYear() - numOfYears;
  return new Date(newYear, monthDay[0], monthDay[1]);
}


/* {

  const year = new Date().getFullYear() - numOfYears


  return randomDate(new Date(year, 0, 1), new Date());
}; */

module.exports = subtractYears;