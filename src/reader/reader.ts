const {readFileSync} = require('fs');

abstract class Reader {
    constructor(public filename: string) {
        
    }
    abstract read(): any;
};


export interface NumberArray {
    numbers: number[];
};
export class NumberReader extends Reader {
    read(): NumberArray {
        const fileContent = readFileSync(this.filename, 'utf-8');
        const numbers = fileContent.split(/\r?\n/).map((value: string) => {return parseInt(value);});
        return {numbers};
    }
};

export interface StringArray {
    strings: string[];
};

export class StringReader extends Reader {
    read(): StringArray {
        const fileContent = readFileSync(this.filename, 'utf-8');
        const strings = fileContent.split(/\r?\n/).map((value: string) => {return value;});
        return {strings};
    }
};