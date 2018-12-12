import takeRight = require('lodash/takeRight');

const grid = [[]];
const testInput: Array<{ coords: number[], serialNumber: number }> = [
    { coords: [3, 5], serialNumber: 8 },
    { coords: [122, 79], serialNumber: 57 },
    { coords: [217, 196], serialNumber: 39 },
    { coords: [101, 153], serialNumber: 71 }
];

const isTest = false;
const inVals = testInput;
const getPowerLevel = (coords: number[], serialNumber: number) => {
    const rackId = coords[0] + 10;
    return +(takeRight((((rackId * coords[1]) + serialNumber) * rackId).toString().split(''), 3)[0]) - 5;
};
if (isTest) {
    inVals.forEach((val) => {
        console.log(getPowerLevel(val.coords, val.serialNumber));
    });
}
const maxSize = 300;
const getBest = (serialNumber: number): void => {
    for (let i = 1; i <= 300; i++) {
        for (let j = 1; j <= 300; j++) {
            if (!grid[i]) {
                grid[i] = [];
            }
            grid[i][j] = getPowerLevel([i, j], serialNumber);
        }
    }
    let max = 0;
    let maxCoords = [];
    let maxSquareSize = 0;
    for (let i = 1; i <= 300; i++) {
        for (let j = 1; j <= 300; j++) {
            const added = [];
            for (let size = 1; size <= maxSize; size++) {
                let val = 0;
                let addition = size - 1;
                if ((i + addition) <= 300 && (j + addition) <= 300) {
                    for (let x = 0; x < size; x++) {
                        for (let y = 0; y < size; y++) {
                            val += grid[i + x][j + y];
                        }
                    }
                }
                if (val > max) {
                    max = val;
                    maxCoords = [i, j];
                    maxSquareSize = size;
                }
            }
            // console.log(added);
        }
    }
    console.log(`max: ${max}, coords: ${maxCoords}, maxSquareSize: ${maxSquareSize}`);
};
// getBest(18);
// getBest(42);
getBest(2568);