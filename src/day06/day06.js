let fs = require("fs");
const { parse } = require("path");

function parseData1(data) {
  const splitData = data.split(/\r?\n/);
  const players = [];
  splitData.array.forEach((element) => {
    const player = element[0].split(" ");
    const handDetails = {
      hand: player[0],
      sortedHand: player[0].split("").sort().join(""),
      wager: parseInt(player[1]),
    };
    players.push(handDetails);
  });

  return players;
}

function day07Part01(data) {
  const raceData = parseData(data);

  let result = 0;

  return result;
}
let input = fs.readFileSync("./sample.txt", "utf8").toString();
let result = day07Part01(input);
console.log("Part 1 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
result = day07Part01(input);
console.log("Part 1 Result", result); // 42364 too high
//---------------------------------------------------------------

function day07Part02(data) {
  const raceData = parseData(data);
  let result = 0;

  return result;
}
input = fs.readFileSync("./sample.txt", "utf8").toString();
result = day07Part02(input);
console.log("Part 2 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
result = day07Part02(input);
console.log("Part 2 Result", result);
