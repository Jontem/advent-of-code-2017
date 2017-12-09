import { input } from "./input";
// const input = `{{<!!>},{<!!>},{<!!>},{<!!>}}`;
// const input = `{},{},{{}}`;
// const input = `{{{},{},{{}}}}`;
// const input = `{}`;

function cleanup(input: string): string {
  return input
    .replace(/!./g, "")
    .replace(/<.*?>/g, "")
    .replace(/,/g, "");
}

function getGroups(input: string): ReadonlyArray<string> {
  if (input.length < 1) {
    return [];
  }

  const groups: Array<string> = [];
  let balance = 0;
  let startIndex = 0;

  for (let ix = 0; ix < input.length; ix++) {
    const char = input[ix];
    if (char === "{") {
      if (balance === 0) {
        startIndex = ix;
      }

      balance++;
    }

    if (char === "}") {
      if (balance === 1) {
        const group = input.slice(startIndex, ix + 1);
        groups.push(group);
        balance = 0;
      } else {
        balance--;
      }
    }
  }

  return groups;
}

const onlyGroups = cleanup(input);
console.log(onlyGroups);

let value = 1;
let left = onlyGroups;
let sum = 0;

while (true) {
  if (left.length < 1) {
    break;
  }

  const groups = getGroups(left);
  sum += groups.length * value;
  value++;
  left = groups.reduce(
    (sofar, current) => sofar + current.replace(/^\{(.*?)\}$/, "$1"),
    ""
  );
}

console.log(sum);
