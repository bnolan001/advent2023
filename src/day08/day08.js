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

let input = fs.readFileSync("./sample.txt", "utf8").toString();
let result = day08Part01(input);
console.log("Part 1 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
result = day08Part01(input);
console.log("Part 1 Result", result); // 42364 too high
//---------------------------------------------------------------

function day08Part02(data) {
  const playerHands = parseDataPart2(data);
  let result = 0;

  return result;
}

//input = fs.readFileSync("./sample.txt", "utf8").toString();
//result = day08Part02(input);
//console.log("Part 2 Sample Result", result);

//input = fs.readFileSync("./data.txt", "utf8").toString();
//result = day08Part02(input);
//console.log("Part 2 Result", result);
