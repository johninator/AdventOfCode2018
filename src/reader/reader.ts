const {readFileSync} = require('fs');

export interface NumberArray {
    numbers: number[];
};

abstract class Reader {
    constructor(public filename: string) {
        
    }
    abstract read(): any;
};

export class NumberReader extends Reader {
    read(): NumberArray {
        const fileContent = readFileSync(this.filename, 'utf-8');
        const numbers = fileContent.split(/\r?\n/).map((value: string) => {return parseInt(value);});
        return {numbers};
    }
};