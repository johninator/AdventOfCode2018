// import * as fs from 'fs';
import * as ModulePromise from './a.out.js';
import { NumberReader, NumberArray } from '../reader/reader';
const modulePromise = ModulePromise.default;

let addFunction: (a: number, b: number) => number;

const reader = new NumberReader('../inputs/input1.txt');
const numbers: NumberArray = reader.read();

modulePromise().then((module: any) => {
    function computeResult(numbers: NumberArray): number {
        return numbers.numbers.reduce((sum, value) => {
            return module.add(sum, value);
        }, 0);
    }
    console.log(computeResult(numbers));
});






