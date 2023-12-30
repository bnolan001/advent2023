let fs = require("fs");

function parseData(data) {
  const splitData = data.split(/\r?\n/);
  const instructions = splitData[0].trim().split("");
  const map = {
    instructions: instructions,
  };
  for (let idx = 2; idx < splitData.length; idx++) {
    const point = splitData[idx].substr(0, 3);
    const left = splitData[idx].substr(7, 3);
    const right = splitData[idx].substr(12, 3);
    map[point] = {
      left: left,
      right: right,
      L: left,
      R: right,
    };
  }

  return map;
}

function day08Part01(data) {
  const map = parseData(data);
  let result = 0;
  let destination = "AAA";
  let instructionIdx = 0;
  while (destination !== "ZZZ") {
    switch (map.instructions[instructionIdx++]) {
      case "L":
        destination = map[destination].left;
        break;
      case "R":
        destination = map[destination].right;
        break;
    }
    if (instructionIdx >= map.instructions.length) {
      instructionIdx = 0;
    }

    result++;
  }

  return result;
}

let input = fs.readFileSync("./sample1.txt", "utf8").toString();
let result = day08Part01(input);
console.log("Part 1 Sample Result", result);

input = fs.readFileSync("./data1.txt", "utf8").toString();
result = day08Part01(input);
console.log("Part 1 Result", result); // 42364 too high
//---------------------------------------------------------------

function day08Part02BruteForce(data) {
  const map = parseData(data);
  const traversePoints = [];
  Object.keys(map).forEach((key) => {
    if (key[2] === "A") {
      traversePoints.push(key);
    }
  });
  let result = 0;
  let instructionIdx = 0;
  let keepGoing = true;
  while (keepGoing) {
    let zCount = traversePoints.reduce((acc, point) => {
      return point[2] === "Z" ? acc + 1 : acc;
    }, 0);
    if (zCount === traversePoints.length) {
      keepGoing = false;
      continue;
    }
    if (zCount > 3) {
      console.log(
        `result: ${result}, instructionIdx: ${instructionIdx}, zCount: ${zCount}`,
        traversePoints
      );
    }

    for (let idx = 0; idx < traversePoints.length; idx++) {
      traversePoints[idx] =
        map[traversePoints[idx]][map.instructions[instructionIdx]];
    }
    instructionIdx++;
    result++;
    if (instructionIdx >= map.instructions.length) {
      instructionIdx = 0;
    }
  }
  return result;
}

function day08Part02Calculation(data) {
  const map = parseData(data);
  const traversePoints = [];
  Object.keys(map).forEach((key) => {
    if (key[2] === "A") {
      traversePoints.push(key);
    }
  });
  const indexOfZ = new Array(traversePoints.length).fill(-1);
  let result = 0;
  let instructionIdx = 0;
  let keepGoing = true;
  let maxIndex = 0;
  while (keepGoing) {
    for (let idx = 0; idx < traversePoints.length; idx++) {
      if (traversePoints[idx][2] === "Z" && indexOfZ[idx] === -1) {
        indexOfZ[idx] = result;
        maxIndex = result;
      }
    }

    for (let idx = 0; idx < traversePoints.length; idx++) {
      traversePoints[idx] =
        map[traversePoints[idx]][map.instructions[instructionIdx]];
    }
    instructionIdx++;
    maxIndex = result;
    result++;
    if (instructionIdx >= map.instructions.length) {
      instructionIdx = 0;
    }
    keepGoing = indexOfZ.some((idx) => idx === -1);
  }

  keepGoing = true;
  let maxIndexIncrement = 0;
  while (keepGoing) {
    maxIndexIncrement += maxIndex;
    keepGoing = indexOfZ.some(
      (idx) => Math.floor(maxIndexIncrement / idx) !== maxIndexIncrement / idx
    );
  }
  result = maxIndexIncrement;
  return result;
}

input = fs.readFileSync("./sample2.txt", "utf8").toString();
result = day08Part02Calculation(input);
console.log("Part 2 Sample Result", result);

input = fs.readFileSync("./data2.txt", "utf8").toString();
result = day08Part02Calculation(input);
console.log("Part 2 Result", result);
