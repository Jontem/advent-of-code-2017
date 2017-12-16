// const input = `ne,ne,ne`;
// const input = `ne,ne,sw,sw`;
// const input = `ne,ne,s,s`;
// const input = `se,sw,se,sw,sw`;
import { input } from "./input";

interface Cube {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}
type Direction = "n" | "ne" | "se" | "s" | "sw" | "nw";

const turns = input.split(",") as Array<Direction>;

const startCord: Cube = {
  x: 0,
  y: 0,
  z: 0
};
/* const endCube = turns.reduce(
  (soFar, direction) => getPos(soFar, direction),
  startCord
); */

let endCube = startCord;
let maxDistance = 0;
for (let i = 0; i < turns.length; i++) {
  endCube = getPos(endCube, turns[i]);
  const distance =
    Math.abs(endCube.x - startCord.x) +
    Math.abs(endCube.y - startCord.y) +
    Math.abs(endCube.z - endCube.z);
  maxDistance = Math.max(maxDistance, distance);
}

console.log(maxDistance);
// Math.abs(dataPort.x - accessPort.x) + Math.abs(dataPort.y - accessPort.y)

function getPos(cube: Cube, direction: Direction): Cube {
  switch (direction) {
    case "n": {
      return {
        x: cube.x,
        y: cube.y + 1,
        z: cube.z - 1
      };
    }
    case "ne": {
      return {
        x: cube.x + 1,
        y: cube.y,
        z: cube.z - 1
      };
    }
    case "se": {
      return {
        x: cube.x + 1,
        y: cube.y - 1,
        z: cube.z
      };
    }
    case "s": {
      return {
        x: cube.x,
        y: cube.y - 1,
        z: cube.z + 1
      };
    }
    case "sw": {
      return {
        x: cube.x - 1,
        y: cube.y,
        z: cube.z + 1
      };
    }
    case "nw": {
      return {
        x: cube.x - 1,
        y: cube.y + 1,
        z: cube.z
      };
    }
  }
}
