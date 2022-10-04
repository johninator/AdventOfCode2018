import {NumberReader} from '../reader/reader'

const reader = new NumberReader("../inputs/input1.txt");
const numbers = reader.read();
console.log(numbers.numbers[0]);

