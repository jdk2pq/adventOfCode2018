import range = require('lodash/range');
import {input} from "./input";

const testInput = [
    'x=495, y=2..7',
    'y=7, x=495..501',
    'x=501, y=3..7',
    'x=498, y=2..4',
    'x=506, y=1..2',
    'x=498, y=10..13',
    'x=504, y=10..13',
    'y=13, x=498..504'
];

const inVals = input;
const sliceOfGround = [[]];
const water = [500, 0];
const sand = '.';
const clay = '#';
const restingWater = '~';
const sandWithWaterPassedThrough = '|';
if (!sliceOfGround[water[0]]) {
    sliceOfGround[water[0]] = [];
}
sliceOfGround[water[0]][water[1]] = '+';
let minY = 9999999;
let maxY = 0;
let minX = 9999999;
let maxX = 0;
inVals.forEach((coordinates) => {
    const split: string[] = coordinates.split(', ');
    let x, y;
    // console.log(split);
    if (split[0].includes('y')) {
        const [rangeStart, rangeEnd] = split[1].split('=')[1].split('..');
        // console.log(rangeStart + ' ' + rangeEnd);
        x = range(+rangeStart, +rangeEnd + 1);
        y = +split[0].split('=')[1];
        if (y < minY) {
            minY = y;
        }
        if (y > maxY) {
            maxY = y;
        }
        // console.log(x);
        x.forEach((xVal) => {
            if (!sliceOfGround[xVal]) {
                sliceOfGround[xVal] = [];
            }
            if (xVal < minX) {
                minX = xVal;
            }
            if (xVal > maxX) {
                maxX = xVal;
            }
            sliceOfGround[xVal][y] = clay;
        });
    } else {
        const [rangeStart, rangeEnd] = split[1].split('=')[1].split('..');
        y = range(+rangeStart, +rangeEnd + 1);
        x = +split[0].split('=')[1];
        if (x < minX) {
            minX = x;
        }
        if (x > maxX) {
            maxX = x;
        }
        // console.log(y);
        y.forEach((yVal) => {
            if (yVal < minY) {
                minY = yVal;
            }
            if (yVal > maxY) {
                maxY = yVal;
            }
            if (!sliceOfGround[x]) {
                sliceOfGround[x] = [];
            }
            sliceOfGround[x][yVal] = clay;
        });
    }
});

let iter = 0;
// console.log(sliceOfGround.length);
// console.log(minX);
// console.log(sliceOfGround[0].length);
const printSliceOfGround = () => {
    console.log(`Iteration: ${iter}`);
    // console.log(`minY: ${minY}, maxY: ${maxY}`);
    // console.log(`minX: ${minX}, maxX: ${maxX}`);
    for (let y = 0; y < maxY + 1; y++) {
        let acc = '';
        for (let x = minX - 1; x < maxX + 2; x++) {
            // console.log(x + ' ' + y);
            if (!sliceOfGround[x] || !sliceOfGround[x][y]) {
                acc = acc + sand;
            } else {
                acc = acc + sliceOfGround[x][y];
            }
        }
        console.log(acc);
    }
    console.log('');
    iter++;
};
const turnOnWater = (waterFlow) => {
    if (waterFlow[1] > maxY) {
        return;
    }
    iter++;
    // console.log(`Iteration: ${iter}`);
    if (!sliceOfGround[waterFlow[0]][waterFlow[1] + 1] ||
        sliceOfGround[waterFlow[0]][waterFlow[1] + 1] === sand
    ) {
        sliceOfGround[waterFlow[0]][waterFlow[1] + 1] = sandWithWaterPassedThrough;
        turnOnWater([waterFlow[0], waterFlow[1] + 1]);
    }
    if (!sliceOfGround[waterFlow[0] + 1]) {
        sliceOfGround[waterFlow[0] + 1] = [];
    }
    if ((sliceOfGround[waterFlow[0]][waterFlow[1] + 1] === clay ||
        sliceOfGround[waterFlow[0]][waterFlow[1] + 1] === restingWater) &&
        (!sliceOfGround[waterFlow[0] + 1][waterFlow[1]] ||
            sliceOfGround[waterFlow[0] + 1][waterFlow[1]] === sand)
    ) {
        sliceOfGround[waterFlow[0] + 1][waterFlow[1]] = sandWithWaterPassedThrough;
        turnOnWater([waterFlow[0] + 1, waterFlow[1]]);
    }
    if (!sliceOfGround[waterFlow[0] - 1]) {
        sliceOfGround[waterFlow[0] - 1] = [];
    }
    if ((sliceOfGround[waterFlow[0]][waterFlow[1] + 1] === clay ||
        sliceOfGround[waterFlow[0]][waterFlow[1] + 1] === restingWater) &&
        (!sliceOfGround[waterFlow[0] - 1][waterFlow[1]] ||
            sliceOfGround[waterFlow[0] - 1][waterFlow[1]] === sand)
    ) {
        sliceOfGround[waterFlow[0] - 1][waterFlow[1]] = sandWithWaterPassedThrough;
        turnOnWater([waterFlow[0] - 1, waterFlow[1]]);
    }
    // check if walled off
    let leftTrue: boolean;
    let rightTrue: boolean;
    const left = [];
    const right = [];
    let add = 1;
    while (sliceOfGround[waterFlow[0] + add][waterFlow[1]] === sandWithWaterPassedThrough) {
        right.push([waterFlow[0] + add, waterFlow[1]]);
        add++;
    }
    rightTrue = sliceOfGround[waterFlow[0] + add][waterFlow[1]] === clay;

    add = 1;
    while (sliceOfGround[waterFlow[0] - add][waterFlow[1]] === sandWithWaterPassedThrough) {
        left.push([waterFlow[0] - add, waterFlow[1]]);
        add++;
    }
    leftTrue = sliceOfGround[waterFlow[0] - add][waterFlow[1]] === clay;
    if (leftTrue && rightTrue) {
        [waterFlow].concat(left).concat(right).forEach((pos) => {
            sliceOfGround[pos[0]][pos[1]] = restingWater;
        });
    }
};

turnOnWater(water);
let waterSquares = 0;
// printSliceOfGround();
// console.log(minY);
// console.log(maxY);

// just picked a random big number, probably overkill
for (let x = 0; x <= 20000; x++) {
    const arr = sliceOfGround[x];
    // console.log(arr);
    if (arr && arr.length > 0) {
        // console.log('data');
        waterSquares = waterSquares + arr.filter((char, yIdx) => {
            if (yIdx <= maxY && yIdx >= minY) {
                return char === restingWater || char === sandWithWaterPassedThrough
            } else {
                return false;
            }
        }).length;
    }
}
let restingWaterSquares = 0;
for (let x = 0; x <= 20000; x++) {
    const arr = sliceOfGround[x];
    // console.log(arr);
    if (arr && arr.length > 0) {
        // console.log('data');
        restingWaterSquares = restingWaterSquares + arr.filter((char, yIdx) => {
            if (yIdx <= maxY && yIdx >= minY) {
                return char === restingWater;
            } else {
                return false;
            }
        }).length;
    }
}
console.log(`all water squares: ${waterSquares}`);
console.log(`resting water squares: ${restingWaterSquares}`);