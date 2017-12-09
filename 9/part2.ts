import { input } from "./input";
// const input = `<{o"i!a,<{i<a>`;
// const input = `<{!>}>`;
// const input = `<random characters>`;
// const input = `<!!!>>`;

const regex = new RegExp(/<(.*?)>/g);
function countGarbage(input: string): number {
  const cleaned = input.replace(/!./g, "");
  let sum = 0;
  let matches;
  // this is really weird. Even if global it doesn't return all matches directly. You have to repeatedly call it
  while ((matches = regex.exec(cleaned)!)) {
    sum += matches.slice(1).reduce((a, b) => a + b.length, 0);
  }
  return sum;
}

console.log(countGarbage(input));
