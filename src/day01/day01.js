let fs = require("fs");

function day01Part01(data) {
  const splitData = data.split("\n");
  let total = 0;
  splitData.forEach((item) => {
    const result = item.match(/\d/g);
    if (result) {
      const number = result[0] + result[result.length - 1];
      total += parseInt(number);
    }
  });
  return total;
}
let input = fs.readFileSync("./sample1.txt", "utf8").toString();
let result = day01Part01(input);
console.log("Part 1 Sample Result", result);

input = fs.readFileSync("./part1.txt", "utf8").toString();
result = day01Part01(input);
console.log("Part 1 Result", result);
//---------------------------------------------------------------
function getAllNumbers(line) {
  let numbers = [];
  for (let i = 0; i < line.length; i++) {
    const value = line.substr(i, 1);
    if (value.match(/\d/g)) {
      numbers.push(parseInt(value));
    } else {
      const remainder = line.substr(i, line.length - i - 1);
      if (remainder.startsWith("one")) {
        numbers.push(1);
      } else if (remainder.startsWith("two")) {
        numbers.push(2);
      } else if (remainder.startsWith("three")) {
        numbers.push(3);
      } else if (remainder.startsWith("four")) {
        numbers.push(4);
      } else if (remainder.startsWith("five")) {
        numbers.push(5);
      } else if (remainder.startsWith("six")) {
        numbers.push(6);
      } else if (remainder.startsWith("seven")) {
        numbers.push(7);
      } else if (remainder.startsWith("eight")) {
        numbers.push(8);
      } else if (remainder.startsWith("nine")) {
        numbers.push(9);
      }
    }
  }
  return numbers;
}

function day01Part02(data) {
  const splitData = data.split("\n");
  let total = 0;
  splitData.forEach((item) => {
    const numbers = getAllNumbers(item);

    if (numbers.length > 0) {
      const number = numbers[0] * 10 + numbers[numbers.length - 1];
      total += number;
    }
  });
  return total;
}
input = fs.readFileSync("./sample2.txt", "utf8").toString();
result = day01Part02(input);
console.log("Part 2 Sample Result", result);

input = fs.readFileSync("./part2.txt", "utf8").toString();
result = day01Part02(input);
console.log("Part 2 Result", result);
