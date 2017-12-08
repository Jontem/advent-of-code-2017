/* const input = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`; */
import { input } from "./input";

interface Program {
  readonly name: string;
  readonly weight: number;
  readonly balancedPrograms: ReadonlyArray<string>;
}

function parse(input: string): ReadonlyArray<Program> {
  const regex = new RegExp(/^(\w+?)\s\((\d+?)\)(\s->\s(.+?))*$/);
  const programs = input
    .split("\n")
    .map(l => regex.exec(l)!)
    .map(
      matches =>
        ({
          name: matches[1],
          weight: parseInt(matches[2], 10),
          balancedPrograms:
            (matches[4] && matches[4].split(",").map(v => v.trim())) || []
        } as Program)
    );

  return programs;
}

const programsBalancingOtherPrograms = parse(input).filter(
  p => p.balancedPrograms.length > 0
);
const programsBeingBalanced = programsBalancingOtherPrograms.reduce(
  (sofar, current) => sofar.concat(current.balancedPrograms),
  [] as Array<string>
);

const bottomProgram = programsBalancingOtherPrograms.find(
  p => programsBeingBalanced.indexOf(p.name) === -1
);

console.log(bottomProgram);
