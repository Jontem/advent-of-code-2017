export {};

function createGenerator(factor: number) {
  return (prevValue: number) => {
    return (prevValue * factor) % 2147483647;
  };
}

const genA = createGenerator(16807);
const genB = createGenerator(48271);

// Example
// let genALastValue = 65;
// let genBLastValue = 8921;

// input
let genALastValue = 618;
let genBLastValue = 814;

let pairs = 0;

const bitMask = Math.pow(2, 16) - 1;
console.time("run");
for (let i = 0; i < 40000000; i++) {
  genALastValue = genA(genALastValue);
  genBLastValue = genB(genBLastValue);

  if ((genALastValue & bitMask) === (genBLastValue & bitMask)) {
    pairs++;
  }
}
console.timeEnd("run");
console.log(pairs);
