import {NumberReader, NumberArray} from '../reader/reader'

const reader = new NumberReader("../inputs/input1.txt");
const numbers: NumberArray = reader.read();


function computeResult(numbers: NumberArray): number {
    let frequencies: Set<number> = new Set();
    let index = 1;
    let frequency = numbers.numbers[0];

    while (!frequencies.has(frequency)) {
      frequencies.add(frequency);
      frequency = apply(numbers.numbers, index, frequency);
      index = index + 1;
      if (index == numbers.numbers.length) {
        index = 0;
      }
    }
    return frequency;
}

function apply(numbers: number[], index: number, frequency: number): number {
    return frequency + numbers[index];
}

console.log(computeResult(numbers));


