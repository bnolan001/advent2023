let fs = require("fs");

function parseData(data) {
  const splitData = data.split(/\r?\n/);
  const mappedData = [];
  splitData.forEach((line) => {
    const lineNums = line
      .trim()
      .split(" ")
      .map((n) => parseInt(n, 10));

    mappedData.push([...lineNums]);
  });

  return mappedData;
}

function day09Part01(data) {
  const map = parseData(data.trim());
  console.log(map);
  let result = 0;

  let diffTree = generateDiffTrees(map);
  console.log("Diff Tree", diffTree);

  diffTree.forEach((diff) => {
    console.log("Diff", diff);
    let sum = 0;
    diff.forEach((sequence) => {
      sum += sequence[sequence.length - 1];
    });
    console.log("Sum", sum);
    result += sum;
  });

  return result;
}

function generateDiffTrees(map) {
  let diffTree = [];
  for (let idx = 0; idx < map.length; idx++) {
    let sequenceMap = [[...map[idx]]];

    let diffValue = 0;
    do {
      for (let i = 0; i < sequenceMap.length; i++) {
        sequenceMap.push([]);
        diffValue = 0;
        for (let j = 0; j < sequenceMap[i].length - 1; j++) {
          var currentDiff = sequenceMap[i][j + 1] - sequenceMap[i][j];
          diffValue += currentDiff;
          sequenceMap[i + 1].push(currentDiff);
        }
        if (diffValue === 0) {
          diffTree.push(sequenceMap);
          break;
        }
      }

      console.log("Sequence Map", sequenceMap);
    } while (diffValue !== 0);
  }

  return diffTree;
}

let input = fs.readFileSync("day09/sample1.txt", "utf8").toString();
let result = day09Part01(input);
console.log("Part 1 Sample Result", result);
console.log("---------------------------");
input = fs.readFileSync("day09/data1.txt", "utf8").toString();
result = day09Part01(input);
console.log("Part 1 Result", result); // 42364 too high
//---------------------------------------------------------------

function day09Part02Calculation(data) {}
/*
input = fs.readFileSync('./sample1.txt', 'utf8').toString();
result = day09Part02Calculation(input);
console.log('Part 2 Sample Result', result);

input = fs.readFileSync('./data1.txt', 'utf8').toString();
result = day09Part02Calculation(input);
console.log('Part 2 Result', result);
*/
