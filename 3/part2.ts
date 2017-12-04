export {};

type Matrix = Array<Array<number>>;
type Direction = "LEFT" | "TOP" | "BOTTOM" | "RIGHT";

function printMatrix(matrix: Matrix) {
  matrix.forEach(r => {
    console.log(r.join(", "));
  });
}

function createEmptyMatrix(length: number): Matrix {
  const rowsAndCols = Math.ceil(Math.sqrt(length));

  const matrix: Matrix = [];
  for (let i = 0; i < rowsAndCols; i++) {
    matrix.push(emptyRow(rowsAndCols));
  }

  return matrix;
}

function emptyRow(length: number): Array<number> {
  const row: Array<number> = [];
  for (let i = 0; i < length; i++) {
    row.push(0);
  }

  return row;
}

function fillRight(matrix: Matrix, x: number, y: number) {
  const left = matrix[y][x - 1] || 0;
  const topLeft = (matrix[y + 1] && matrix[y + 1][x - 1]) || 0;
  const sum = left + topLeft;
  matrix[y][x] = sum;
}

function fillTop(matrix: Matrix, x: number, y: number) {
  const bottomLeft = (matrix[y + 1] && matrix[y + 1][x - 1]) || 0;
  const bottom = (matrix[y + 1] && matrix[y + 1][x]) || 0;
  const sum = bottomLeft + bottom;
  matrix[y][x] = sum;
}

function fillLeft(matrix: Matrix, x: number, y: number) {}

function fillPos(matrix: Matrix, direction: Direction, x: number, y: number) {
  console.log(`fillPos: x: ${x}, y: ${y}`);
  switch (direction) {
    case "RIGHT": {
      fillRight(matrix, x, y);
      break;
    }
    case "TOP": {
      fillTop(matrix, x, y);
      break;
    }
    case "LEFT": {
      const right = (matrix[y][x + 1]) || 0;
      const bottom = (matrix[y - 1] && matrix[y - 1][x]) || 0;
      const bottomRight  = (matrix[y - 1] && matrix[y - 1][x]) || 0;
      //   console.log(`bottomLeft: ${bottomLeft}`);
      //   console.log(`bottom: ${bottom}`);
      const sum = bottomLeft + bottom;
      matrix[y][x] = sum;
      break;
    }
  }
}

function goNext(
  matrix: Matrix,
  direction: Direction,
  currX: number,
  currY: number
) {
  console.log(direction);
  switch (direction) {
    case "RIGHT": {
      console.log("currY: " + currY);
      fillPos(matrix, direction, currX + 1, currY);
      printMatrix(matrix);
      goNext(matrix, "TOP", currX + 1, currY);
      break;
    }
    case "TOP": {
      fillPos(matrix, direction, currX, currY - 1);
      goNext(matrix, "LEFT", currX, currY - 1);
      break;
    }
    case "LEFT": {
      fillPos(matrix, direction, currX - 1, currY);
      goNext(matrix, "BOTTOM", currX - 1, currY);
    }
  }
}

const matrix = createEmptyMatrix(23);

const middle = Math.ceil(matrix.length / 2) - 1;
console.log(middle);

matrix[middle][middle] = 1;
goNext(matrix, "RIGHT", middle, middle);

printMatrix(matrix);
