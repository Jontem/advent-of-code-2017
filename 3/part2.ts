export {};

type Matrix = Array<Array<number>>;

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

function getNext(
  x: number,
  y: number,
  currentDirection: Direction
): { x: number; y: number } {
  switch (currentDirection) {
    case "RIGHT": {
      return { x: x + 1, y };
    }
    case "TOP": {
      return { x, y: y - 1 };
    }
    case "BOTTOM": {
      return { x, y: y + 1 };
    }
    case "LEFT": {
      return { x: x - 1, y };
    }
  }
}

function nextDirection(currentDirection: Direction) {
  switch (direction) {
    case "RIGHT": {
      return "TOP";
    }
    case "TOP": {
      return "LEFT";
    }
    case "LEFT": {
      return "BOTTOM";
    }
    case "BOTTOM": {
      return "RIGHT";
    }
  }
}

function getValue(matrix: Matrix, x: number, y: number): number {
  const right = (matrix[y] && matrix[y][x + 1]) || 0;
  const rightTop = (matrix[y - 1] && matrix[y - 1][x + 1]) || 0;
  const top = (matrix[y - 1] && matrix[y - 1][x]) || 0;
  const topLeft = (matrix[y - 1] && matrix[y - 1][x - 1]) || 0;
  const left = (matrix[y] && matrix[y][x - 1]) || 0;
  const bottomLeft = (matrix[y + 1] && matrix[y + 1][x - 1]) || 0;
  const bottom = (matrix[y + 1] && matrix[y + 1][x]) || 0;
  const bottomRight = (matrix[y + 1] && matrix[y + 1][x + 1]) || 0;

  return (
    right + rightTop + top + topLeft + left + bottomLeft + bottom + bottomRight
  );
}

type Direction = "LEFT" | "RIGHT" | "TOP" | "BOTTOM";

const input = 312051;

const matrix = createEmptyMatrix(input);

const middle = Math.ceil(matrix.length / 2) - 1;

let x = middle;
let y = middle;

let iteration = 0;
let stepsBeforeTurn = 1;
let sinceTurn = 0;
let direction: Direction = "RIGHT";
matrix[y][x] = 1;
x++;
while (true) {
  if (matrix[matrix.length - 1][matrix.length - 1] > 0) {
    break;
  }

  const value = getValue(matrix, x, y);
  if (value > input) {
    console.log("Value: ", value);
    break;
  }
  matrix[y][x] = value;
  sinceTurn++;

  // printMatrix(matrix);

  if (sinceTurn < stepsBeforeTurn) {
    const next = getNext(x, y, direction);
    x = next.x;
    y = next.y;
  } else {
    direction = nextDirection(direction);
    const next = getNext(x, y, direction);
    x = next.x;
    y = next.y;
    if (direction === "LEFT" || direction === "RIGHT") {
      stepsBeforeTurn++;
    }
    sinceTurn = 0;
  }
  iteration++;
}
