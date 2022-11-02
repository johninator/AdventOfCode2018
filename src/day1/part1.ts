import { NumberReader, NumberArray } from '../reader/reader';

const reader = new NumberReader('../inputs/input1.txt');
const numbers: NumberArray = reader.read();

function computeResult(numbers: NumberArray): number {
  return numbers.numbers.reduce((sum, value) => {
    return sum + value;
  }, 0);
}
console.log(computeResult(numbers));
