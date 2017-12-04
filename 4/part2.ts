import { input } from "./input";

const validWords = input.split("\n").filter(phrase => {
  const words = phrase.split(" ");
  const validWords = words.reduce((sofar, current) => {
    const parsed = current
      .split("")
      .sort()
      .join("");

    if (sofar.has(parsed)) {
      return sofar;
    }

    return sofar.add(parsed);
  }, new Set<string>());

  return validWords.size === words.length;
});

console.log(validWords.length);
