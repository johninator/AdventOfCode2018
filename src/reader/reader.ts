interface NumberArray {
    numbers: number[];
};

abstract class Reader {
    constructor(private filename: string) {
        
    }
    abstract read(): any;
};

export class NumberReader extends Reader {
    read(): NumberArray {
        return {numbers: [1,2]};
    }
};