let fs = require("fs");

function getGamePlayData(data) {
  const gameData = [];

  const plays = data.trim().split(":")[1].split(";");
  plays.forEach((element) => {
    const cubes = element.split(",");
    cubes.forEach((cube) => {
      const cubeData = cube.split(" ");

      const cubeDataObj = {
        number: parseInt(cubeData[1]),
        color: cubeData[2],
      };
      gameData.push(cubeDataObj);
    });
  });

  return gameData;
}

function day02Part01(data) {
  const splitData = data.split(/\r?\n/);
  let totalSuccessfulGames = 0;
  splitData.forEach((element) => {
    if (element.trim() === "") return;
    const gameData = getGamePlayData(element);
    let successful = true;
    gameData.forEach((cube) => {
      switch (cube.color) {
        case "red":
          if (cube.number > 12) {
            successful = false;
          }
          break;
        case "green":
          if (cube.number > 13) {
            successful = false;
          }
          break;
        case "blue":
          if (cube.number > 14) {
            successful = false;
          }
          break;
        default:
          break;
      }
    });
    if (successful) {
      const gameNumber = parseInt(element.split(":")[0].split(" ")[1]);

      totalSuccessfulGames += gameNumber;
    }
  });

  return totalSuccessfulGames;
}
let input = fs.readFileSync("./sample.txt", "utf8").toString();
let result = day02Part01(input);
console.log("Part 1 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
result = day02Part01(input);
console.log("Part 1 Result", result);
//---------------------------------------------------------------

function day02Part02(data) {
  const splitData = data.split(/\r?\n/);
  let powerValue = 0;
  splitData.forEach((element) => {
    if (element.trim() === "") return;
    const gameData = getGamePlayData(element);
    let minRed = 1;
    let minGreen = 1;
    let minBlue = 1;
    gameData.forEach((cube) => {
      switch (cube.color) {
        case "red":
          if (cube.number > minRed) {
            minRed = cube.number;
          }
          break;
        case "green":
          if (cube.number > minGreen) {
            minGreen = cube.number;
          }
          break;
        case "blue":
          if (cube.number > minBlue) {
            minBlue = cube.number;
          }
          break;
        default:
          break;
      }
    });
    powerValue += minRed * minGreen * minBlue;
  });
  return powerValue;
}
input = fs.readFileSync("./sample.txt", "utf8").toString();
result = day02Part02(input);
console.log("Part 2 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
result = day02Part02(input);
console.log("Part 2 Result", result);
