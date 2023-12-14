let fs = require("fs");

function buildArray(dataArray) {
  const array = [];
  dataArray.forEach((element) => {
    const row = [];
    let number = 0;

    element.split("").forEach((char) => {
      if (char.match(/\d/g)) {
        const tempNum = parseInt(char);
        number = number * 10 + tempNum;
        row.push(">");
      } else {
        if (number > 0) {
          const numLength = number.toString().length;
          row[row.length - 1] = number;
          number = 0;
        }
        if (char === ".") {
          row.push(0);
        } else {
          row.push("+");
        }
      }
    });
    array.push(row);
  });
  const rowSize = array[0].length;
  const paddingRow = Array(rowSize).fill(0);
  array.unshift(paddingRow);
  array.push(paddingRow);
  return array;
}

function getNumericValue(value) {
  if (value === "+") {
    return 0;
  } else {
    return value;
  }
}

function day03Part01(data) {
  const splitData = data.split(/\r?\n/);
  const dataArray = buildArray(splitData);
  console.log(dataArray);
  let result = 0;
  for (let i = 1; i < dataArray.length; i++) {
    for (let j = 0; j < dataArray[i].length; j++) {
      if (dataArray[i][j] === "+") {
        let sum = 0;
        // Get numbers to the left
        if (j > 0) {
          sum += getNumericValue(dataArray[i - 1][j - 1]);
          sum += getNumericValue(dataArray[i][j - 1]);
          sum += getNumericValue(dataArray[i + 1][j - 1]);
        }
        // Get numbers above and below
        sum += getNumericValue(dataArray[i - 1][j]);
        sum += getNumericValue(dataArray[i + 1][j]);
        // Get numbers to the right

        sum += getNumericValue(dataArray[i - 1][j + 1]);
        sum += getNumericValue(dataArray[i][j + 1]);
        sum += getNumericValue(dataArray[i + 1][j + 1]);
        console.log(sum);
        result += sum;
      }
    }
  }

  return result;
}
let input = fs.readFileSync("./sample.txt", "utf8").toString();
let result = day03Part01(input);
console.log("Part 1 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
//result = day03Part01(input);
//console.log("Part 1 Result", result);
//---------------------------------------------------------------

function day03Part02(data) {
  const splitData = data.split(/\r?\n/);
  let result = 0;

  return result;
}
// input = fs.readFileSync("./sample.txt", "utf8").toString();
// result = day02Part02(input);
// console.log("Part 2 Sample Result", result);

// input = fs.readFileSync("./data.txt", "utf8").toString();
// result = day03Part02(input);
// console.log("Part 2 Result", result);
