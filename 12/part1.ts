import { input } from "./input";
/* const input = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`; */

interface ParsedInput {
  readonly id: number;
  readonly connectedTo: ReadonlyArray<number>;
}

const connectionToZero = new Set<number>();

const parsedInputs = parseInput(input);

const res = doWork(connectionToZero, parsedInputs, parsedInputs[0]);

function doWork(
  connectionToZero: Set<number>,
  parsedInputs: ReadonlyArray<ParsedInput>,
  current: ParsedInput
) {
  if (connectionToZero.has(current.id)) {
    return;
  }

  connectionToZero.add(current.id);
  current.connectedTo.forEach(x =>
    doWork(connectionToZero, parsedInputs, parsedInputs[x])
  );
}

console.log(connectionToZero);
console.log(connectionToZero.size);

function parseInput(input: string): ReadonlyArray<ParsedInput> {
  const regex = new RegExp(/^(\d+?)\s<->\s(.+?)$/);
  return input
    .split("\n")
    .map(s => regex.exec(s))
    .map(reg => ({
      id: parseInt(reg![1], 10),
      connectedTo: reg![2].split(",").map(s => parseInt(s, 10))
    }));
}
