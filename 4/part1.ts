import { input } from "./input";

const validWords = input.split("\n").filter(phrase => {
  const words = phrase.split(" ");
  const validWords = words.reduce((sofar, current) => {
    if (sofar.has(current)) {
      return sofar;
    }

    return sofar.add(current);
  }, new Set<string>());

  return validWords.size === words.length;
});

console.log(validWords.length);
