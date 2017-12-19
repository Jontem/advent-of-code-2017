import * as fs from "fs";
import * as path from "path";

interface RootState {
  readonly layers: ReadonlyArray<LayerState | undefined>;
  readonly punishment: number;
}

interface LayerState {
  readonly scannerPos: number;
  readonly range: number;
}

const input: string = readInput(path.join(__dirname, "./input.txt"));
const layerStateArray = parseInput(input);

let picoSecond = 0;
while (true) {
  const state = main(picoSecond);
  if (state.punishment === 0) {
    break;
  }
  picoSecond++;
}

console.log(`picoSecond: ${picoSecond}`);

function main(picoSecond: number) {
  let state: RootState = {
    layers: layerStateArray,
    punishment: 0
  };

  for (let i = 0; i < layerStateArray.length; i++) {
    const layerState = layerStateArray[i];
    if (layerState) {
      const scannerPos =
        (layerState.scannerPos + i + picoSecond) % (layerState.range * 2 - 2);
      if (scannerPos === 0) {
        const punishment = (i + picoSecond) * layerState.range;
        state = {
          ...state,
          punishment: state.punishment + punishment
        };
      }

      if (state.punishment > 0) {
        return state;
      }
    }
  }

  return state;
}
function readInput(file: string): string {
  const textFile = fs.readFileSync(file, {
    encoding: "utf8"
  });
  return textFile;
}

function parseInput(fileContent: string): Array<LayerState | undefined> {
  const rows = fileContent.split("\n");
  const rangeArray: Array<number> = [];
  rows.forEach(r => {
    const { depth, range } = parseRow(r);
    rangeArray[depth] = range;
  });

  return rangeArray.map(range => {
    return range ? { range: range, velocity: -1, scannerPos: 0 } : undefined;
  });
}

function parseRow(r: string) {
  const parts = r.split(":");
  return {
    depth: parseInt(parts[0], 10),
    range: parseInt(parts[1], 10)
  };
}
