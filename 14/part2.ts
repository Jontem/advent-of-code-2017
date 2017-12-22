import { createKnotHash } from "./knot-hash";

declare var process: any;

const input = "hfdlxzhv";
// const input = "flqrgnkx";

function hex2Bin(hex: string): string {
  const bin = `000${parseInt(hex, 16).toString(2)}`.slice(-4);
  return bin;
}

const defragMatrix: Array<Array<number>> = [];
for (let i = 0; i < 128; i++) {
  const toHash = `${input}-${i}`;
  const knotHash = createKnotHash(toHash);
  const row = knotHash
    .split("")
    .map(hex2Bin)
    .join("")
    .split("")
    .map(s => parseInt(s, 10));
  defragMatrix.push(row);
}

let groups = 2;
for (let y = 0; y < 128; y++) {
  for (let x = 0; x < 128; x++) {
    if (defragMatrix[y][x] !== 1) {
      continue;
    }

    updateGroup(defragMatrix, x, y, groups);
    groups++;
  }
}

const uniqueGroups = new Set<number>();
for (let i = 0; i < 128; i++) {
  defragMatrix[i].forEach(g => {
    if (g !== 0) {
      uniqueGroups.add(g);
    }
  });
}

console.log(uniqueGroups.size);

function updateGroup(
  matrix: Array<Array<number>>,
  x: number,
  y: number,
  group: number
): void {
  matrix[y][x] = group;

  if (matrix[y][x + 1] && matrix[y][x + 1] === 1) {
    updateGroup(matrix, x + 1, y, group);
  }

  if (matrix[y][x - 1] && matrix[y][x - 1] === 1) {
    updateGroup(matrix, x - 1, y, group);
  }

  if (matrix[y + 1] && matrix[y + 1][x] === 1) {
    updateGroup(matrix, x, y + 1, group);
  }

  if (matrix[y - 1] && matrix[y - 1][x] === 1) {
    updateGroup(matrix, x, y - 1, group);
  }
}
