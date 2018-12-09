import max = require('lodash/max');
import min = require('lodash/min');
import flattenDeep = require('lodash/flattenDeep');
import countBy = require('lodash/countBy');
import maxBy = require('lodash/maxBy');
import forOwn = require('lodash/forOwn');
import {input} from "./input";

const testInput = [
    [1, 1],
    [1, 6],
    [8, 3],
    [3, 4],
    [5, 5],
    [8, 9]
];

const inVals: number[][] = input;
const xVals = inVals.map((vals) => vals[0]);
const yVals = inVals.map((vals) => vals[1]);
const maxX = max(xVals);
const maxY = max(yVals);
const grid = [[]];
const multiple = -1;
inVals.forEach((vals, idx) => {
    if (!grid[vals[0]]) {
        grid[vals[0]] = [];
    }
    if (grid[vals[0]][vals[1]]) {
        grid[vals[0]][vals[1]] = multiple;
    } else {
        grid[vals[0]][vals[1]] = idx;
    }
});

// console.log(grid);

const manhattan = (coords1: number[], coords2: number[]): number => {
    return Math.abs(coords2[0] - coords1[0]) + Math.abs(coords2[1] - coords1[1]);
};

for (let i = 0; i <= maxX; i++) {
    for (let j = 0; j <= maxY; j++) {
        let ret;
        const manhattanDistances = inVals.map((vals) => {
            return manhattan([i, j], vals);
        });
        const minDistance = min(manhattanDistances);
        if (manhattanDistances.filter((num) => num === minDistance).length > 1) {
            ret = -1;
        } else {
            ret = manhattanDistances.indexOf(minDistance);
        }
        if (!grid[i]) {
            grid[i] = [];
        }
        grid[i][j] = ret;
    }
}
const flattened: number[] = flattenDeep(grid);
const cantBe = [];
for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
        if (x === 0 || y === 0) {
            cantBe.push(grid[x][y]);
        }
        if (x === maxX || y === maxY) {
            cantBe.push(grid[x][y]);
        }
    }
}
const filteredFlattened = flattened.filter((value) => !cantBe.includes(value));
const arrayCounts = [];
// console.log(grid);
forOwn(countBy(filteredFlattened), (value, key) => arrayCounts.push([key, value]));
console.log(maxBy(arrayCounts, (values: any[]) => values[1]));
