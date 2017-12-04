export {};

function printMatrix(matrix: number[][]) {
  matrix.forEach(r => {
    console.log(r.join(", "));
  });
}

function createSpiralMatrix(matrix: number[][]): number[][] {
  const rowsAndCols = matrix.length;
  let x = rowsAndCols;
  let y = rowsAndCols - 1;
  let numberToFill = matrix.length * matrix.length;
  while (true) {
    const next = chooseNext(matrix, x, y);
    if (!next) {
      break;
    }

    x = next.x;
    y = next.y;
    matrix[y][x] = numberToFill;
    numberToFill--;
  }

  return matrix;
}

function chooseNext(
  matrix: number[][],
  currX: number,
  currY: number
): { x: number; y: number } | undefined {
  if (
    matrix[currY][currX - 1] === -1 &&
    (!matrix[currY + 1] || matrix[currY + 1][currX] !== -1)
  ) {
    return {
      y: currY,
      x: currX - 1
    };
  } else if (matrix[currY - 1] && matrix[currY - 1][currX] === -1) {
    return {
      y: currY - 1,
      x: currX
    };
  } else if (matrix[currY] && matrix[currY][currX + 1] === -1) {
    return {
      y: currY,
      x: currX + 1
    };
  } else if (matrix[currY + 1] && matrix[currY + 1][currX] === -1) {
    return {
      y: currY + 1,
      x: currX
    };
  }

  return undefined;
}

function createEmptyMatrix(length: number): number[][] {
  const rowsAndCols = Math.ceil(Math.sqrt(length));

  const matrix: number[][] = [];
  for (let i = 0; i < rowsAndCols; i++) {
    matrix.push(emptyRow(rowsAndCols));
  }

  return matrix;
}

function emptyRow(length: number): number[] {
  const row: number[] = [];
  for (let i = 0; i < length; i++) {
    row.push(-1);
  }

  return row;
}

function findVector(
  matrix: number[][],
  value: number
): { x: number; y: number } {
  for (const [index, row] of matrix.entries()) {
    const valueIndex = row.indexOf(value);

    if (valueIndex > -1) {
      return {
        y: index + 1,
        x: valueIndex + 1
      };
    }
  }

  return { x: -99, y: -99 };
}

const emptyMatrix = createEmptyMatrix(312051);
const spiralMatrix = createSpiralMatrix(emptyMatrix);
// printMatrix(spiralMatrix);
const accessPort = findVector(spiralMatrix, 1);
const dataPort = findVector(spiralMatrix, 312051);
console.log(accessPort);
console.log(dataPort);

console.log(
  Math.abs(dataPort.x - accessPort.x) + Math.abs(dataPort.y - accessPort.y)
);

// printMatrix([[1, 2, 3], [4, 5, 6]]);
// printMatrix(createEmptyMatrix(25));
