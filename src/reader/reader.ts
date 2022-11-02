const { readFileSync } = require('fs');

abstract class Reader {
    constructor(public filename: string){
        this.filename = filename;
    }
    abstract read(): any;
}


export interface NumberArray {
    numbers: number[];
}
export class NumberReader extends Reader {
    read(): NumberArray {
        const fileContent = readFileSync(this.filename, 'utf-8');
        const numbers = fileContent.split(/\r?\n/).map((value: string) => { return parseInt(value); });
        return { numbers };
    }
}

export interface StringArray {
    strings: string[];
}

export class StringReader extends Reader {
    read(): StringArray {
        const fileContent = readFileSync(this.filename, 'utf-8');
        const strings = fileContent.split(/\r?\n/).map((value: string) => { return value; });
        return { strings };
    }
}

export interface Fabric {
    coordX: number;
    coordY: number;
    sizeX: number;
    sizeY: number;
    id?: number;
}

export class FabricReader extends Reader {
    read(): Fabric[] {
        const fileContent = readFileSync(this.filename, 'utf-8');
        const lines: string[] = fileContent.split(/\r?\n/).map((value: string) => { return value; });

        let fabrics: Fabric[] = [];

        lines.forEach((line: string) => {
            const coordIndex = line.indexOf('@');
            const sizeIndex = line.indexOf(':');
            const idIndex = line.indexOf('#');
            const coords: number[] = line.substring(coordIndex + 1, sizeIndex).split(',').map((val) => parseInt(val));
            const sizes: number[] = line.substring(sizeIndex + 1).split('x').map((val) => parseInt(val));
            const id: number = parseInt(line.substring(idIndex + 1, coordIndex));
            fabrics.push({
                coordX: coords[0],
                coordY: coords[1],
                sizeX: sizes[0],
                sizeY: sizes[1],
                id: id
            });
        });

        return fabrics;
    }
}


