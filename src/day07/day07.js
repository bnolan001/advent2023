let fs = require("fs");
const FIVEOFAKIND = 6;
const FOUROFAKIND = 5;
const FULLHOUSE = 4;
const THREEOFAKIND = 3;
const TWOPAIR = 2;
const ONEPAIR = 1;
const HIGHCARD = 0;

function parseData(data) {
  const splitData = data.split(/\r?\n/);
  const players = [];

  splitData.forEach((element) => {
    const cards = element.substring(0, 6).trim();
    const handDetails = {
      hand: cards,
      wager: parseInt(element.substring(6).trim()),
      score: calculateScore(cards),
      multiplier: 0,
    };

    players.push(handDetails);
  });

  const sortedHands = players.sort((a, b) => {
    if (a.score > b.score) {
      return -1;
    } else if (a.score < b.score) {
      return 1;
    } else {
      for (let i = 0; i < a.hand.length; i++) {
        let aCard = getCardValue(a.hand[i]);
        let bCard = getCardValue(b.hand[i]);
        if (aCard > bCard) {
          return -1;
        }
        if (aCard < bCard) {
          return 1;
        }
      }
      return 0;
    }
  });

  return sortedHands;
}

function getCardValue(card) {
  switch (card) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 11;
    case "T":
      return 10;
    default:
      return parseInt(card);
  }
}

function calculateScore(hand) {
  let cardCount = {};
  hand.split("").forEach((card) => {
    if (cardCount[card]) {
      cardCount[card]++;
    } else {
      cardCount[card] = 1;
    }
  });
  const cards = Object.keys(cardCount);
  if (cards.length === 1) {
    return FIVEOFAKIND;
  } else if (cards.length === 2) {
    if (cardCount[cards[0]] === 4 || cardCount[cards[1]] === 4) {
      return FOUROFAKIND;
    } else {
      return FULLHOUSE;
    }
  } else if (cards.length === 3) {
    if (
      cardCount[cards[0]] === 3 ||
      cardCount[cards[1]] === 3 ||
      cardCount[cards[2]] === 3
    ) {
      return THREEOFAKIND;
    } else {
      return TWOPAIR;
    }
  } else if (cards.length === 4) {
    return ONEPAIR;
  } else {
    return HIGHCARD;
  }
}

function day07Part01(data) {
  const playerHands = parseData(data);
  let result = 0;

  playerHands.forEach((player, idx) => {
    player.multiplier = playerHands.length - idx;
    result += player.wager * player.multiplier;
  });

  return result;
}

let input = fs.readFileSync("./sample.txt", "utf8").toString();
let result = day07Part01(input);
console.log("Part 1 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
result = day07Part01(input);
console.log("Part 1 Result", result); // 42364 too high
//---------------------------------------------------------------
function parseDataPart2(data) {
  const splitData = data.split(/\r?\n/);
  const players = [];

  splitData.forEach((element) => {
    const cards = element.substring(0, 6).trim();
    const handDetails = {
      hand: cards,
      wager: parseInt(element.substring(6).trim()),
      score: calculateScorePart2(cards),
      multiplier: 0,
    };

    players.push(handDetails);
  });

  const sortedHands = players.sort((a, b) => {
    if (a.score > b.score) {
      return -1;
    } else if (a.score < b.score) {
      return 1;
    } else {
      for (let i = 0; i < a.hand.length; i++) {
        let aCard = getCardValuePart2(a.hand[i]);
        let bCard = getCardValuePart2(b.hand[i]);
        if (aCard > bCard) {
          return -1;
        }
        if (aCard < bCard) {
          return 1;
        }
      }
      return 0;
    }
  });

  return sortedHands;
}

function getCardValuePart2(card) {
  switch (card) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 1;
    case "T":
      return 10;
    default:
      return parseInt(card);
  }
}

function calculateScorePart2(hand) {
  let cardCount = {};
  hand.split("").forEach((card) => {
    if (cardCount[card]) {
      cardCount[card]++;
    } else {
      cardCount[card] = 1;
    }
  });

  let cards = Object.keys(cardCount);
  if (cardCount["J"]) {
    let highestCard = "";
    let highestCardCount = 0;
    cards.forEach((card) => {
      if (card !== "J" && cardCount[card] > highestCardCount) {
        highestCard = card;
        highestCardCount = cardCount[card];
      }
    });
    cardCount[highestCard] += cardCount["J"];
    delete cardCount["J"];
  }

  cards = Object.keys(cardCount);
  if (cards.length === 1) {
    return FIVEOFAKIND;
  } else if (cards.length === 2) {
    if (cardCount[cards[0]] === 4 || cardCount[cards[1]] === 4) {
      return FOUROFAKIND;
    } else {
      return FULLHOUSE;
    }
  } else if (cards.length === 3) {
    if (
      cardCount[cards[0]] === 3 ||
      cardCount[cards[1]] === 3 ||
      cardCount[cards[2]] === 3
    ) {
      return THREEOFAKIND;
    } else {
      return TWOPAIR;
    }
  } else if (cards.length === 4) {
    return ONEPAIR;
  } else {
    return HIGHCARD;
  }
}

function day07Part02(data) {
  const playerHands = parseDataPart2(data);
  let result = 0;
  playerHands.forEach((player, idx) => {
    player.multiplier = playerHands.length - idx;
    result += player.wager * player.multiplier;
  });
  return result;
}
input = fs.readFileSync("./sample.txt", "utf8").toString();
result = day07Part02(input);
console.log("Part 2 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
result = day07Part02(input);
console.log("Part 2 Result", result);
