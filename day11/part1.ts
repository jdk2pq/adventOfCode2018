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

const getBest3x3 = (serialNumber: number): void => {
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
    for (let i = 1; i <= 300; i++) {
        for (let j = 1; j <= 300; j++) {
            if (i + 2 <= 300 && j + 2 <= 300) {
                const val = grid[i][j] +
                    grid[i][j + 1] + grid[i][j + 2] +
                    grid[i + 1][j] + grid[i + 2][j] +
                    grid[i + 1][j + 1] + grid[i + 1][j + 2] +
                    grid[i + 2][j + 1] + grid[i + 2][j + 2];
                if (val > max) {
                    max = val;
                    maxCoords = [i, j];
                }
            }
        }
    }
    console.log(`max: ${max}, coords: ${maxCoords}`);
};
// getBest3x3(18);
// getBest3x3(42);
getBest3x3(2568);