// const input = ``;
// const input = `AoC 2017`;
import { input } from "./input";
const listLength = 256;
// const listLength = 5;

declare var process: any;

const endSequence = "17, 31, 73, 47, 23".split(",").map(v => parseInt(v, 10));
const inputLengths = Array.from(input)
  .map(v => v.charCodeAt(0))
  .concat(endSequence);

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
    const values = list.slice(start, start + length);
    return values;
  }
  const elementsToEnd = list.length - start;
  const elementsInBeginning = length - elementsToEnd;
  const values = [...list.slice(start), ...list.slice(0, elementsInBeginning)];

  return values;
}

function getReverseMap(
  list: Array<number>,
  start: number,
  length: number
): ReverseMap {
  const oldValues = getValues(list, start, length);
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

function reverseList(list: Array<number>, index: number, inputLength: number) {
  const reverseMap = getReverseMap(list, index, inputLength);
  //   console.log("reverseMap", reverseMap.entries());
  return replaceValues(list, reverseMap);
}

function splitEvery(list: Array<number>, value: number): Array<Array<number>> {
  const splits: Array<Array<number>> = [];

  for (let i = 0; i < list.length; i += value) {
    const slice = list.slice(i, i + value);
    splits.push(slice);
  }

  return splits;
}

let list = generateList(listLength);

let skip = 0;
let index = 0;

for (let i = 0; i < 64; i++) {
  for (const inputLength of inputLengths) {
    list = reverseList(list, index, inputLength);
    index = (index + inputLength + skip) % list.length;
    skip++;
  }
}

const sparseHash = list;
const denseHash = splitEvery(sparseHash, 16).map(group =>
  group.reduce((a, b) => a ^ b, 0)
);

const hash = denseHash.reduce(
  (a, b) => a + ("0" + b.toString(16)).slice(-2),
  ""
);

console.log(hash);
