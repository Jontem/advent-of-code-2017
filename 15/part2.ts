export {};
function createGenerator(factor: number, multiple: number) {
  return (prevValue: number) => {
    while (true) {
      prevValue = (prevValue * factor) % 2147483647;
      if (prevValue % multiple === 0) {
        return prevValue;
      }
    }
  };
}

const genA = createGenerator(16807, 4);
const genB = createGenerator(48271, 8);

// Example
// let genALastValue = 65;
// let genBLastValue = 8921;

// input
let genALastValue = 618;
let genBLastValue = 814;

let pairs = 0;

const bitMask = Math.pow(2, 16) - 1;
console.time("run");
for (let i = 0; i < 5000000; i++) {
  genALastValue = genA(genALastValue);
  genBLastValue = genB(genBLastValue);
  if ((genALastValue & bitMask) === (genBLastValue & bitMask)) {
    pairs++;
  }
}
console.timeEnd("run");
console.log(pairs);
