import * as fs from 'fs';

const wasmBuffer = fs.readFileSync('add.wasm');
WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
  // Exported function live under instance.exports
  const { sayHi } = wasmModule.instance.exports;
  console.log(sayHi());
});





// import { NumberReader, NumberArray } from '../reader/reader';

// const reader = new NumberReader('../inputs/input1.txt');
// const numbers: NumberArray = reader.read();

// function computeResult(numbers: NumberArray): number {
//     return numbers.numbers.reduce((sum, value) => {
//         return sum + value;
//     }, 0);
// }
// console.log(computeResult(numbers));
