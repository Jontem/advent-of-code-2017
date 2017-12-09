export {};
// const input = `pbga (66)
// xhth (57)
// ebii (61)
// havc (66)
// ktlj (57)
// fwft (72) -> ktlj, cntj, xhth
// qoyq (66)
// padx (45) -> pbga, havc, qoyq
// tknk (41) -> ugml, padx, fwft
// jptl (61)
// ugml (68) -> gyxo, ebii, jptl
// gyxo (61)
// cntj (57)`;
import { input } from "./input";
declare var process: any;
interface ParsedProgram {
  readonly name: string;
  readonly weight: number;
  readonly balancedPrograms: ReadonlyArray<string>;
}

interface Program {
  readonly name: string;
  readonly weight: number;
  readonly balancedPrograms: ReadonlyArray<Program>;
}

function parse(input: string): ReadonlyArray<ParsedProgram> {
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
        } as ParsedProgram)
    );

  return programs;
}

function buildProgram(
  allPrograms: ReadonlyArray<ParsedProgram>,
  programName: string
): Program {
  const program = allPrograms.find(p => p.name === programName)!;
  if (program.balancedPrograms.length < 1) {
    return {
      ...program,
      balancedPrograms: []
    };
  }
  return {
    ...program,
    balancedPrograms: program.balancedPrograms.map(b =>
      buildProgram(allPrograms, b)
    )
  };
}

function discSum(program: Program): number {
  return (
    program.weight +
    program.balancedPrograms.reduce((a, b) => a + discSum(b), 0)
  );
}

function getFaultyNode(programs: ReadonlyArray<Program>): Program {
  const results = programs.map(b => ({
    name: b.name,
    weight: discSum(b)
  }));

  const map = results.reduce((sofar, current) => {
    return sofar.set(current.weight, (sofar.get(current.weight) || 0) + 1);
  }, new Map<number, number>());

  const [wrongWeight] = Array.from(map.entries()).sort(
    ([, value1], [, value2]) => value1 - value2
  )[0];

  const programName = results.find(r => r.weight === wrongWeight)!.name;
  return programs.find(p => p.name === programName)!;
}

function checkUnBalance(program: Program, correct: number) {
  /*   if (program.balancedPrograms.length > 0) {
    program.balancedPrograms.forEach(b => checkUnBalance(b));
  } */

  const children = program.balancedPrograms.map(b => ({
    name: b.name,
    weight: discSum(b)
  }));

  const values = new Set(children.map(v => v.weight));
  if (values.size > 1) {
    const faultyNode = getFaultyNode(program.balancedPrograms);
    const correctProgramWeight = children.find(c => c.name !== faultyNode.name)!
      .weight;
    checkUnBalance(faultyNode, correctProgramWeight);
  } else {
    const childrenSum = children.reduce((a, c) => a + c.weight, 0);
    console.log("result " + (correct - childrenSum));
  }
}

const allPrograms = parse(input);

const programsBalancingOtherPrograms = allPrograms.filter(
  p => p.balancedPrograms.length > 0
);
const programsBeingBalanced = programsBalancingOtherPrograms.reduce(
  (sofar, current) => sofar.concat(current.balancedPrograms),
  [] as Array<string>
);

const bottomProgram = programsBalancingOtherPrograms.find(
  p => programsBeingBalanced.indexOf(p.name) === -1
)!;

const tree = buildProgram(allPrograms, bottomProgram.name);

checkUnBalance(tree, 0);
