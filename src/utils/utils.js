var count = 0;

function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newId(){
  return count++;
}

function randomInArray(arr){
  return arr[random(0, arr.length -1)];
}

export {random}

export {newId}

export {randomInArray}
