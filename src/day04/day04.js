let fs = require("fs");

function parseCardData(data) {
  const gameArray = [];

  data.forEach((element) => {
    if (element.trim().length === 0) {
      return;
    }
    const rowSections = element.split(/[:|]/);
    const card = {
      game: parseInt(rowSections[0].split(" ").filter(Boolean)[1]),
      winningNumbers: rowSections[1]
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((num) => parseInt(num)),
      scratchNumbers: rowSections[2]
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((num) => parseInt(num)),
    };
    gameArray.push(card);
  });
  return gameArray;
}

function day04Part01(data) {
  const splitData = data.split(/\r?\n/);
  const gameCards = parseCardData(splitData);
  let result = 0;

  gameCards.forEach((card) => {
    const winnings = card.winningNumbers.reduce((acc, num) => {
      if (card.scratchNumbers.includes(num)) {
        acc++;
      }
      return acc;
    }, -1);
    result += winnings == -1 ? 0 : Math.pow(2, winnings);
  });

  return result;
}
let input = fs.readFileSync("./sample.txt", "utf8").toString();
let result = day04Part01(input);
console.log("Part 1 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
result = day04Part01(input);
console.log("Part 1 Result", result); // 42364 too high
//---------------------------------------------------------------

function day04Part02(data) {
  const splitData = data.split(/\r?\n/);
  const gameCards = parseCardData(splitData);
  const winnings = new Array(gameCards.length).fill(0);
  let result = 0;

  gameCards.forEach((card) => {
    const totalCards = card.winningNumbers.reduce((acc, num) => {
      if (card.scratchNumbers.includes(num)) {
        acc++;
      }
      return acc;
    }, 0);

    for (let i = 1; i <= totalCards; i++) {
      const cardIndex = i + card.game - 1;
      if (cardIndex < winnings.length) {
        winnings[cardIndex] += winnings[card.game - 1] + 1;
      }
    }
  });
  result = winnings.reduce((acc, num) => acc + num, 0) + winnings.length;
  return result;
}
input = fs.readFileSync("./sample.txt", "utf8").toString();
result = day04Part02(input);
console.log("Part 2 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
result = day04Part02(input);
console.log("Part 2 Result", result);
