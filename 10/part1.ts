const input = `3, 4, 1, 5`;
// const input = `3, 4, 1`;
// const input = `88`;
// import { input } from "./input";
// const listLength = 256;
const listLength = 5;

type ReverseMap = Map<number, number>;

function generateList(length: number): Array<number> {
  const list: Array<number> = [];
  for (let i = 0; i < length; i++) {
    list.push(i);
  }

  return list;
}

function getValues(list: ReadonlyArray<number>, start: number, length: number) {
  const end = start + length;
  if (end < list.length) {
    const values = list.slice(start, length);
    return values;
  }
  const elementsToEnd = list.length - start;
  const elementsInBeginning = length - elementsToEnd;
  const values = [...list.slice(start), ...list.slice(0, elementsInBeginning)];
  //   console.log("values", values);

  return values;
}

function getReverseMap(
  list: Array<number>,
  start: number,
  length: number
): ReverseMap {
  const oldValues = getValues(list, start, length);
  console.log("values to replace", oldValues);
  const reversed = oldValues.concat().reverse();

  const map = new Map<number, number>();

  for (const [ix, oldValue] of oldValues.entries()) {
    map.set(oldValue, reversed[ix]);
  }

  return map;
}

function replaceValues(
  oldList: Array<number>,
  reverseMap: ReverseMap
): Array<number> {
  const replaceList = oldList.concat();

  for (const [oldValue, newValue] of reverseMap.entries()) {
    const index = oldList.indexOf(oldValue);
    replaceList[index] = newValue;
  }
  return replaceList;
}

const inputLengths: ReadonlyArray<number> = input
  .split(",")
  .map(v => parseInt(v, 10));

let list = generateList(listLength);

let skip = 0;
let index = 0;

// console.log("start", list);
for (const inputLength of inputLengths) {
  // Lenght larger than the size of the list is not valid
  // Should the skip size be increased?
  //   if (inputLength > list.length) {
  //     console.log("hej");
  //     skip++;
  //     continue;
  //   }

  const reverseMap = getReverseMap(list, index, inputLength);
  //   console.log("reverseMap", reverseMap.entries());
  list = replaceValues(list, reverseMap);
  //   console.log("list", list);
  index = (index + inputLength + skip) % list.length;
  skip++;
  //   console.log("index", index);
  //   console.log("skip", skip);
}
console.log("1: ", list[0]);
console.log("2: ", list[1]);

console.log("product", list[0] * list[1]);
