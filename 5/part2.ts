import { input } from "./input";

const instructions = input.split("\n").map(l => parseInt(l, 10));
console.log(instructions);

let steps = 0;
let pos = 0;

while (true) {
  if (instructions[pos] === undefined) {
    break;
  }

  const jump = instructions[pos];

  instructions[pos]++;
  steps++;

  pos = pos + jump;
}

console.log(steps);
