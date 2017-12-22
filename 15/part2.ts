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

// Example
const genA = createGenerator(16807, 4);
const genB = createGenerator(48271, 8);

// Example
// let genALastValue = 65;
// let genBLastValue = 8921;

// input
let genALastValue = 618;
let genBLastValue = 814;

let pairs = 0;

declare var process: any;

for (let i = 0; i < 5000000; i++) {
  genALastValue = genA(genALastValue);
  genBLastValue = genB(genBLastValue);

  if (
    genALastValue.toString(2).substr(-16) ===
    genBLastValue.toString(2).substr(-16)
  ) {
    pairs++;
  }
}

console.log(pairs);
