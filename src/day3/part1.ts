import { FabricReader, Fabric } from "../reader/reader";

const reader = new FabricReader("../inputs/input3.txt");
const fabrics = reader.read();

computeResult(fabrics);

function computeResult(fabrics: Fabric[]): number {
    const fabricMax = computeMaxFabric(fabrics);
    let votes: number[] = new Array(fabricMax.sizeX * fabricMax.sizeY).fill(0);
    votes = insertVotes(votes, fabrics, fabricMax.sizeX);
    console.log(countVotes(votes));

    return 0;
}

function computeMaxFabric(fabrics: Fabric[]): Fabric {

    const fabricX = fabrics.reduce((prev, curr) => {
        return curr.coordX + curr.sizeX > prev.coordX + prev.sizeX ? curr : prev;
    });
    const fabricY = fabrics.reduce((prev, curr) => {
        return curr.coordY + curr.sizeY > prev.coordY + prev.sizeY ? curr : prev;
    });


    return {
        coordX: 0,
        coordY: 0,
        sizeX: fabricX.coordX + fabricX.sizeX,
        sizeY: fabricY.coordY + fabricY.sizeY
    };
}

function insertVotes(votes: number[], fabrics: Fabric[], sizeX_max: number): number[] {

    return votes.map((val, index) => {

        const indexX = index % sizeX_max;
        const indexY = Math.floor(index / sizeX_max);
        let sum = 0;

        for (const fabric of fabrics) {
            if (checkIfPointIsInsideFabric(indexX, indexY, fabric)) {
                sum++;
            }
        }
        return sum;
    });
}

function checkIfPointIsInsideFabric(coordX: number, coodY: number, fabric: Fabric): boolean {
    return (coordX >= fabric.coordX &&
        coordX < fabric.coordX + fabric.sizeX &&
        coodY >= fabric.coordY &&
        coodY < fabric.coordY + fabric.sizeY);
}

function countVotes(votes: number[]): number {
    return votes.reduce((sum, value) => {
        if (value >= 2) {
            sum += 1;
        }
        return sum;
    }, 0);
}


