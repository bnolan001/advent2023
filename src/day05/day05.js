let fs = require("fs");

function parseData(data) {
  const gardeningData = {};
  const seeds = data[0]
    .split(":")[1]
    .split(" ")
    .filter(Boolean)
    .map((num) => parseInt(num));
  gardeningData.seeds = seeds;

  let mapKey = "";
  let parsedData = [];
  for (let i = 2; i < data.length; i++) {
    if (data[i].trim().length === 0) {
      gardeningData[mapKey] = parsedData;
      parsedData = [];
      mapKey = "";
      continue;
    }
    console.log(data[i]);

    if (mapKey === "") {
      mapKey = data[i].replace(" map:", "");
    } else {
      const values = data[i]
        .split(" ")
        .filter(Boolean)
        .map((num) => parseInt(num));
      parsedData.push(values);
    }
  }
  if (mapKey !== "") {
    gardeningData[mapKey] = parsedData;
  }

  return gardeningData;
}

function buildSourceToDestinationMap(key, mapData) {
  const mapPoints = key.split(" ")[0].split("-to-");
  const sourceMap = [];
  const destinationMap = [];
  mapData.forEach((row, rowIndex) => {
    destinationMap.push({ start: row[0], end: row[0] - 1 + row[2] });
    sourceMap.push({ start: row[1], end: row[1] - 1 + row[2] });
  });
  return {
    source: mapPoints[0],
    destination: mapPoints[1],
    sourcePoints: sourceMap,
    destinationPoints: destinationMap,
  };
}

function generateFullMapping(splitData) {
  const gardeningData = parseData(splitData);
  const keys = Object.keys(gardeningData);
  const seedMapping = {};
  keys.forEach((key) => {
    if (key === "seeds") return;
    const mapData = gardeningData[key];
    const map = buildSourceToDestinationMap(key, mapData);
    seedMapping[map.source] = map;
  });
  seedMapping.seeds = gardeningData.seeds;
  return seedMapping;
}

function day05Part01(data) {
  const splitData = data.split(/\r?\n/);
  const seedMapping = generateFullMapping(splitData);
  const locationValues = [];
  console.log(seedMapping);
  let result = 0;
  seedMapping.seeds.forEach((seed) => {
    console.log(seed);
    let destination = "";
    let source = "seed";
    let sourceValue = seed;
    while (destination !== "location") {
      const sourceData = seedMapping[source];
      const sourceIdx = sourceData.sourcePoints.findIndex(
        (x) => x.start <= sourceValue && x.end >= sourceValue
      );
      let destinationValue = -1;
      if (sourceIdx > -1) {
        const diff = sourceValue - sourceData.sourcePoints[sourceIdx].start;
        destinationValue = sourceData.destinationPoints[sourceIdx].start + diff;
      }
      source = sourceData.destination;

      if (destinationValue > -1) {
        sourceValue = destinationValue;
      }

      if (source === "location") {
        destination = "location";
        locationValues.push(sourceValue);
      } else {
        destination = "";
      }
    }
  });
  console.log(locationValues);
  result = locationValues.reduce(
    (a, b) => (a < b ? a : b),
    Number.MAX_SAFE_INTEGER
  );
  return result;
}
let input = fs.readFileSync("./sample.txt", "utf8").toString();
let result = day05Part01(input);
console.log("Part 1 Sample Result", result);

input = fs.readFileSync("./data.txt", "utf8").toString();
result = day05Part01(input);
console.log("Part 1 Result", result); // 42364 too high
//---------------------------------------------------------------

function day04Part02(data) {
  const splitData = data.split(/\r?\n/);
  let result = 0;

  return result;
}
//input = fs.readFileSync("./sample.txt", "utf8").toString();
//result = day05Part02(input);
//console.log("Part 2 Sample Result", result);

//input = fs.readFileSync("./data.txt", "utf8").toString();
//result = day05Part02(input);
//console.log("Part 2 Result", result);
