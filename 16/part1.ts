import { input } from "./input";

// const input = `s1,x3/4,pe/b`;
const numberOfPrograms = 16;

interface Spin {
  readonly type: "SPIN";
  readonly size: number;
}

interface Exchange {
  readonly type: "EXCHANGE";
  readonly posA: number;
  readonly posB: number;
}

interface Partner {
  readonly type: "PARTNER";
  readonly programA: string;
  readonly programB: string;
}

type Move = Spin | Exchange | Partner;

function createPrograms(programs: number): string {
  let s = "";
  const charCode = 97;
  for (let i = 0; i < programs; i++) {
    s += String.fromCharCode(charCode + i);
  }

  return s;
}

function parseMove(s: string): Move {
  switch (s[0]) {
    case "s": {
      return {
        type: "SPIN",
        size: parseInt(s.substr(1), 10)
      };
    }

    case "x": {
      const positions = s.substr(1).split("/");
      return {
        type: "EXCHANGE",
        posA: parseInt(positions[0], 10),
        posB: parseInt(positions[1], 10)
      };
    }
    case "p": {
      const programs = s.substr(1).split("/");
      return {
        type: "PARTNER",
        programA: programs[0],
        programB: programs[1]
      };
    }

    default: {
      throw new Error("Shouldn't get here");
    }
  }
}

function swap(programs: string, indexA: number, indexB: number): string {
  const programA = programs[indexA];
  const programB = programs[indexB];
  const newPrograms = programs.split("");
  newPrograms[indexA] = programB;
  newPrograms[indexB] = programA;
  return newPrograms.join("");
}

function doMove(programs: string, move: Move): string {
  switch (move.type) {
    case "SPIN": {
      const chunk = programs.substr(-move.size);
      const rest = programs.replace(chunk, "");
      return chunk + rest;
    }
    case "EXCHANGE": {
      return swap(programs, move.posA, move.posB);
    }
    case "PARTNER": {
      const indexOfA = programs.indexOf(move.programA);
      const indexOfB = programs.indexOf(move.programB);
      return swap(programs, indexOfA, indexOfB);
    }
  }
}

let programs = createPrograms(numberOfPrograms);

for (const unParsedMove of input.split(",")) {
  const move = parseMove(unParsedMove);
  programs = doMove(programs, move);
}

console.log(programs);
