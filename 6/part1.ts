const input = `14	0	15	12	11	11	3	5	1	6	8	4	9	1	8	4`;
// const input = `0	2	7	0`;

const start = input.split("\t").map(v => parseInt(v, 10));

function go(
  states: Set<string>,
  current: ReadonlyArray<number>,
  iterationCount: number
): number {
  while (true) {
    const currentKey = current.join(",");
    if (states.has(currentKey)) {
      return iterationCount;
    }

    const index = iterationCount % current.length;
    const max = current.reduce((a, b) => Math.max(a, b), 0);
    const maxIndex = current.indexOf(max);
    const distributed = distribute(current, maxIndex);

    const newKey = distributed.join(",");
    if (currentKey !== newKey) {
      states.add(currentKey);
    }
    current = distributed;
    iterationCount++;
  }
}

function distribute(arr: ReadonlyArray<number>, index: number) {
  const blocks = arr[index];
  if (blocks === 0) {
    return arr;
  }
  const part = Math.floor(blocks / arr.length);
  const rest = blocks % arr.length;
  const newArr = [...arr.slice(index + 1), ...arr.slice(0, index), 0];
  const distributed = newArr.map((v, ix) => v + part + (ix < rest ? 1 : 0));
  let sortedBack = distributed;
  for (let i = 0; i < arr.length - index - 1; i++) {
    const [first, ...rest] = sortedBack;
    sortedBack = [...rest, first];
  }
  return sortedBack;
}

console.log(go(new Set(), start, 0));
