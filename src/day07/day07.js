let fs = require("fs");

function parseData1(data) {
  const splitData = data.split(/\r?\n/);
  const times = splitData[0]
    .split(":")[1]
    .split(" ")
    .filter(Boolean)
    .map((num) => parseInt(num));
  const distance = splitData[1]
    .split(":")[1]
    .split(" ")
    .filter(Boolean)
    .map((num) => parseInt(num));
  const raceData = {
    times,
    distance,
    winningTimes: [],
  };
  return raceData;
}

function day06Part01(data) {
  const raceData = parseData1(data);

  let result = 0;
  for (let raceIdx = 0; raceIdx < raceData.times.length; raceIdx++) {
    const record = raceData.distance[raceIdx];
    const winningHoldTimes = [];
    for (let holdTime = 1; holdTime <= raceData.times[raceIdx]; holdTime++) {
      const distance = holdTime * (raceData.times[raceIdx] - holdTime);
      if (distance > record) {
        winningHoldTimes.push(holdTime);
      }
    }
    raceData.winningTimes.push(winningHoldTimes);
  }

  result = raceData.winningTimes.reduce((a, b) => a * b.length, 1);
  return result;
}
let input = fs.readFileSync("./sample.txt", "utf8").toString();
let result = day06Part01(input);
console.log("Part 1 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
result = day06Part01(input);
console.log("Part 1 Result", result); // 42364 too high
//---------------------------------------------------------------

function parseData2(data) {
  const splitData = data.split(/\r?\n/);
  let strNum = splitData[0].split(":")[1].replace(/\s/g, "");
  const times = parseInt(strNum);
  strNum = splitData[1].split(":")[1].replace(/\s/g, "");
  const distance = parseInt(strNum);
  const raceData = {
    times,
    distance,
    winningTimes: [],
  };
  return raceData;
}

function day06Part02(data) {
  const raceData = parseData2(data);
  let result = 0;
  const record = raceData.distance;
  const winningHoldTimes = [];
  for (let holdTime = 1; holdTime <= raceData.times; holdTime++) {
    const distance = holdTime * (raceData.times - holdTime);
    if (distance > record) {
      winningHoldTimes.push(holdTime);
    }
    raceData.winningTimes = winningHoldTimes;
  }

  result = raceData.winningTimes.length;
  return result;
}
input = fs.readFileSync("./sample.txt", "utf8").toString();
result = day06Part02(input);
console.log("Part 2 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
result = day06Part02(input);
console.log("Part 2 Result", result);
