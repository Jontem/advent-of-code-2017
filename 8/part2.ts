/* const input = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`; */
import { input } from "./input";

interface Instruction {
  readonly register: string;
  readonly action: string;
  readonly actionRegister: string;
  readonly actionValue: number;
  readonly condition: string;
}
const instructionRegex = new RegExp(
  /^(\w+?)\s(\w+?)\s(.+?)\sif\s((\w+?)\s.+?)$/
);
const instructions: ReadonlyArray<Instruction> = input.split("\n").map(l => {
  const matches = instructionRegex.exec(l)!;

  return {
    register: matches[1],
    action: matches[2],
    actionValue: parseInt(matches[3], 10),
    condition: matches[4],
    actionRegister: matches[5]
  };
});

function getNewValue(
  oldValue: number,
  action: string,
  actionValue: number
): number {
  if (action === "inc") {
    return oldValue + actionValue;
  }

  return oldValue - actionValue;
}

function getRegisterValue(register: string) {
  const registerValue = registryState.get(register) || 0;
  return registerValue;
}

const registryState = new Map<string, number>();
let largestEver = 0;

for (const instruction of instructions) {
  let evalString = `var ${instruction.register} = ${getRegisterValue(
    instruction.register
  )};`;
  evalString += `var ${instruction.actionRegister} = ${getRegisterValue(
    instruction.actionRegister
  )};`;
  evalString += instruction.condition;

  if (eval(evalString)) {
    const registerValue = getRegisterValue(instruction.register);
    const newValue = getNewValue(
      registerValue,
      instruction.action,
      instruction.actionValue
    );
    largestEver = Math.max(largestEver, newValue);
    registryState.set(instruction.register, newValue);
  }
}
const largestValue = Array.from(registryState.values()).sort(
  (a, b) => b - a
)[0];
console.log("largestValue: ", largestValue);
console.log("largestEver: ", largestEver);
