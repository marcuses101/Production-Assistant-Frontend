export function removeUndefined(obj) {
  return Object.entries(obj).reduce((obj,[key,value])=>{
    if (value !== undefined) {
      obj[key] = value;
    }
    return obj;
  },{})
}

export function randomIntId(){
  return Math.floor(Math.random()*10000000000)
}

export function toDateString(date){
  return (date)
    ? (new Date(date)).toISOString().split('T')[0]
    : (new Date()).toISOString().split('T')[0]
}