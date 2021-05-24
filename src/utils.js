export function removeUndefined(obj) {
  return Object.entries(obj).reduce((obj,[key,value])=>{
    if (value !== undefined) {
      obj[key] = value;
    }
    return obj;
  },{})
}
// used for generating random id in demo mode
export function randomIntId(){
  return Math.floor(Math.random()*10000000000)
}

export function toDateString(date){
  return (date)
    ? (new Date(date)).toISOString().split('T')[0]
    : (new Date()).toISOString().split('T')[0]
}

export function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}