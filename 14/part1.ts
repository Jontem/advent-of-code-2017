import { createKnotHash } from "./knot-hash";

declare var process: any;

const input = "hfdlxzhv";

function hex2Bin(hex: string): string {
  const bin = `000${parseInt(hex, 16).toString(2)}`.slice(-4);
  return bin;
}

let usedCount = 0;
for (let i = 0; i < 128; i++) {
  const toHash = `${input}-${i}`;
  const knotHash = createKnotHash(toHash);
  const row = knotHash
    .split("")
    .map(hex2Bin)
    .join("");
  const used = row.split("").filter(c => c === "1").length;
  usedCount += used;
}

console.log(usedCount);
