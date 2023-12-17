let fs = require("fs");

function buildArray(dataArray) {
  const array = [];
  dataArray.forEach((element) => {
    const row = [0]; // pad begining of row with 0
    let number = 0;

    element.split("").forEach((char) => {
      if (char.match(/\d/g)) {
        const tempNum = parseInt(char);
        number = number * 10 + tempNum;
        row.push(">");
      } else {
        if (number > 0) {
          row[row.length - 1] = number;
          number = 0;
        }
        if (char === ".") {
          row.push(0);
        } else {
          if (char === "*") {
            row.push(char);
          } else {
            row.push("+");
          }
        }
      }
    });
    if (number > 0) {
      row[row.length - 1] = number;
    }
    row.push(0); // pad end of row with 0
    array.push(row);
  });
  const rowSize = array[0].length;
  const paddingRow = Array(rowSize).fill(0);
  array.unshift(paddingRow);
  array.push(paddingRow);
  return array;
}

function getNumericValue(data, indices) {
  let sum = 0;
  const keys = Object.keys(indices);
  for (let ct = 0; ct < keys.length; ct++) {
    index = indices[keys[ct]];
    const value = data[index[0]][index[1]];
    if (Number.isInteger(value) && value > 0) {
      sum += data[index[0]][index[1]];
    } else if (value === ">") {
      let foundNumber = false;
      for (let col = index[1]; col < data[index[0]].length; col++) {
        if (Number.isInteger(data[index[0]][col])) {
          sum += data[index[0]][col];
          foundNumber = true;
        }
        if (`${index[0]}-${col}` in indices) {
          // Remove the index from the object so we don't do the number twice
          indices[`${index[0]}-${col}`] = [0, 0];
          //ct--;
        }
        if (foundNumber) {
          break;
        }
      }
    }
  }
  return sum;
}

function day03Part01(data) {
  const splitData = data.split(/\r?\n/);
  const dataArray = buildArray(splitData);

  let result = 0;
  for (let i = 1; i < dataArray.length - 1; i++) {
    for (let j = 1; j < dataArray[i].length - 1; j++) {
      // We found a summation symbol
      if (dataArray[i][j] === "+" || dataArray[i][j] === "*") {
        let sum = 0;
        // Create grid of indexes to check
        const indices = {};
        indices[`${i - 1}-${j - 1}`] = [i - 1, j - 1];
        indices[`${i}-${j - 1}`] = [i, j - 1];
        indices[`${i + 1}-${j - 1}`] = [i + 1, j - 1];

        indices[`${i - 1}-${j}`] = [i - 1, j];
        indices[`${i + 1}-${j}`] = [i + 1, j];

        indices[`${i - 1}-${j + 1}`] = [i - 1, j + 1];
        indices[`${i}-${j + 1}`] = [i, j + 1];
        indices[`${i + 1}-${j + 1}`] = [i + 1, j + 1];
        sum = getNumericValue(dataArray, indices);
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
result = day03Part01(input);
console.log("Part 1 Result", result);
//---------------------------------------------------------------

function getNumericRatioValue(data, indices) {
  let parts = [];
  const keys = Object.keys(indices);

  for (let ct = 0; ct < keys.length; ct++) {
    index = indices[keys[ct]];
    const value = data[index[0]][index[1]];
    if (Number.isInteger(value) && value > 0) {
      parts.push(data[index[0]][index[1]]);
    } else if (value === ">") {
      let foundNumber = false;
      for (let col = index[1]; col < data[index[0]].length; col++) {
        if (Number.isInteger(data[index[0]][col])) {
          parts.push(data[index[0]][col]);
          foundNumber = true;
        }
        if (`${index[0]}-${col}` in indices) {
          // Remove the index from the object so we don't do the number twice
          indices[`${index[0]}-${col}`] = [0, 0];
          //ct--;
        }
        if (foundNumber) {
          break;
        }
      }
    }
  }

  return parts.length == 2
    ? parts.reduce((product, current) => product * current, 1)
    : 0;
}

function day03Part02(data) {
  const splitData = data.split(/\r?\n/);
  const dataArray = buildArray(splitData);

  let result = 0;
  for (let i = 1; i < dataArray.length - 1; i++) {
    for (let j = 1; j < dataArray[i].length - 1; j++) {
      // We found a summation symbol
      if (dataArray[i][j] === "*") {
        let sum = 0;
        // Create grid of indexes to check
        const indices = {};
        indices[`${i - 1}-${j - 1}`] = [i - 1, j - 1];
        indices[`${i}-${j - 1}`] = [i, j - 1];
        indices[`${i + 1}-${j - 1}`] = [i + 1, j - 1];

        indices[`${i - 1}-${j}`] = [i - 1, j];
        indices[`${i + 1}-${j}`] = [i + 1, j];

        indices[`${i - 1}-${j + 1}`] = [i - 1, j + 1];
        indices[`${i}-${j + 1}`] = [i, j + 1];
        indices[`${i + 1}-${j + 1}`] = [i + 1, j + 1];

        sum = getNumericRatioValue(dataArray, indices);

        result += sum;
      }
    }
  }

  return result;
}
input = fs.readFileSync("./sample.txt", "utf8").toString();
result = day03Part02(input);
console.log("Part 2 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
result = day03Part02(input);
console.log("Part 2 Result", result);
