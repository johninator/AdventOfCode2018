import { FabricReader, Fabric } from '../reader/reader';

const reader = new FabricReader('../inputs/input3.txt');
const fabrics = reader.read();

computeResult(fabrics);

type FabricSet = Set<Fabric>;

function computeResult(fabrics: Fabric[]): number {
    const fabricMax = computeMaxFabric(fabrics);
    const votes: FabricSet[] = new Array(fabricMax.sizeX * fabricMax.sizeY);
    for (let i = 0; i < votes.length; ++i) {
        votes[i] = new Set<Fabric>();
    }

    const fabricIds: Set<number> = insertVotes(votes, fabrics, fabricMax.sizeX);
    console.log(fabricIds);

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

function insertVotes(votes: FabricSet[], fabrics: Fabric[], sizeX_max: number): Set<number> {
    const fabricIds = new Set<number>();
    fabrics.forEach((fabric) => {
        if (fabric.id !== undefined) {
            fabricIds.add(fabric.id);
        }
    });

    votes.forEach((val: FabricSet, index) => {
        const indexX = index % sizeX_max;
        const indexY = Math.floor(index / sizeX_max);

        for (const fabric of fabrics) {
            if (checkIfPointIsInsideFabric(indexX, indexY, fabric)) {
                votes[index].add(fabric);
            }
        }

        if (votes[index].size > 1) {
            votes[index].forEach((fabric) => {
                fabricIds.delete(fabric.id!);
            });
        }
    }, votes);

    return fabricIds;
}

function checkIfPointIsInsideFabric(coordX: number, coodY: number, fabric: Fabric): boolean {
    return (
        coordX >= fabric.coordX &&
        coordX < fabric.coordX + fabric.sizeX &&
        coodY >= fabric.coordY &&
        coodY < fabric.coordY + fabric.sizeY
    );
}
