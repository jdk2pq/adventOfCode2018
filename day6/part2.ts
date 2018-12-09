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

// console.log(grid);
const maxDistance = 10000;
const manhattan = (coords1: number[], coords2: number[]): number => {
    return Math.abs(coords2[0] - coords1[0]) + Math.abs(coords2[1] - coords1[1]);
};

for (let i = 0; i <= maxX; i++) {
    for (let j = 0; j <= maxY; j++) {
        const manhattanDistanceSum = inVals.reduce((acc, vals) => {
            return acc + manhattan([i, j], vals);
        }, 0);
        if (!grid[i]) {
            grid[i] = [];
        }
        if (manhattanDistanceSum < maxDistance) {
            grid[i][j] = manhattanDistanceSum;
        } else {
            grid[i][j] = -1;
        }
    }
}

// console.log(grid);

const flattenedFilteredArray = flattenDeep(grid).filter(num => num >= 0);
console.log(flattenedFilteredArray.length);
