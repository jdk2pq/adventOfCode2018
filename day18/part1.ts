import flatten = require('lodash/flatten');
import {input} from "./input";

let lumberCollectionArea = [[]];
const open = '.';
const tree = '|';
const lumberyard = '#';

const testInput = [
    '.#.#...|#.',
    '.....#|##|',
    '.|..|...#.',
    '..|#.....#',
    '#.#|||#|#|',
    '...#.||...',
    '.|....|...',
    '||...#|.#|',
    '|.||||..|.',
    '...#.|..|.'
];

input.forEach((row, rowIdx) => {
    row.split('').forEach((char, charIdx) => {
        if (!lumberCollectionArea[rowIdx]) {
            lumberCollectionArea[rowIdx] = [];
        }
        lumberCollectionArea[rowIdx][charIdx] = char;
    });
});

const getSurrounding = (x, y) => {
    return [
        lumberCollectionArea[x + 1] ? lumberCollectionArea[x + 1][y] : undefined,
        lumberCollectionArea[x - 1] ? lumberCollectionArea[x - 1][y] : undefined,
        lumberCollectionArea[x][y + 1],
        lumberCollectionArea[x][y - 1],
        lumberCollectionArea[x + 1] ? lumberCollectionArea[x + 1][y + 1] : undefined,
        lumberCollectionArea[x + 1] ? lumberCollectionArea[x + 1][y - 1] : undefined,
        lumberCollectionArea[x - 1] ? lumberCollectionArea[x - 1][y + 1] : undefined,
        lumberCollectionArea[x - 1] ? lumberCollectionArea[x - 1][y - 1] : undefined
    ];
};

const updateLumberCollectionArea = () => {
    const newLumberCollectionArea = [[]];

    lumberCollectionArea.forEach((row, rowIdx) => {
        row.forEach((char, charIdx) => {
            const surrounding = getSurrounding(rowIdx, charIdx);
            if (!newLumberCollectionArea[rowIdx]) {
                newLumberCollectionArea[rowIdx] = [];
            }
            if (char === open) {
                if (surrounding.filter((char) => char === tree).length >= 3) {
                    newLumberCollectionArea[rowIdx][charIdx] = tree;
                } else {
                    newLumberCollectionArea[rowIdx][charIdx] = open;
                }
            } else if (char === tree) {
                if (surrounding.filter((char) => char === lumberyard).length >= 3) {
                    newLumberCollectionArea[rowIdx][charIdx] = lumberyard;
                } else {
                    newLumberCollectionArea[rowIdx][charIdx] = tree;
                }
            } else if (char === lumberyard) {
                if (surrounding.includes(tree) && surrounding.includes(lumberyard)) {
                    newLumberCollectionArea[rowIdx][charIdx] = lumberyard;
                } else {
                    newLumberCollectionArea[rowIdx][charIdx] = open;
                }
            }
        });
    });
    lumberCollectionArea = newLumberCollectionArea;
};
const dimension = 50;

const printLumberCollectionArea = () => {
    console.log(`Iteration: ${iter}`);
    for (let x = 0; x < dimension; x++) {
        let acc = '';
        for (let y = 0; y < dimension; y++) {
            acc = acc + lumberCollectionArea[x][y];
        }
        console.log(acc);
    }
    console.log('');
};

let iter = 0;
let previousTrees = 0;
let previousLumber = 0;
const countLumber = () => {
    const flattened: string[] = flatten(lumberCollectionArea);
    let trees = flattened.filter((char) => char === tree).length;
    let lumber = flattened.filter((char) => char === lumberyard).length;
    return [trees, lumber];
};

// value must be greater or equal to 577
// same pattern for every 28 values after 577
const findLumberCollectionNumberForGivenNumber = (value) => {
    const answer = (value - 577) % 28;
    if (answer === 1) {
        return 633 * 367;
    } else if (answer === 2) {
        return 634 * 362;
    } else if (answer === 3) {
        return 626 * 365;
    } else if (answer === 4) {
        return 623 * 364;
    } else if (answer === 5) {
        return 616 * 360;
    } else if (answer === 6) {
        return 615 * 355;
    } else if (answer === 7) {
        return 608 * 354;
    } else if (answer === 8) {
        return 602 * 357;
    } else if (answer === 9) {
        return 596 * 348;
    } else if (answer === 10) {
        return 595 * 342;
    } else if (answer === 11) {
        return 591 * 336;
    } else if (answer === 12) {
        return 592 * 335;
    } else if (answer === 13) {
        return 589 * 336;
    } else if (answer === 14) {
        return 591 * 335;
    } else if (answer === 15) {
        return 589 * 334;
    } else if (answer === 16) {
        return 595 * 330;
    } else if (answer === 17) {
        return 596 * 330;
    } else if (answer === 18) {
        return 603 * 329;
    } else if (answer === 19) {
        return 606 * 329;
    } else if (answer === 20) {
        return 616 * 328;
    } else if (answer === 21) {
        return 620 * 334;
    } else if (answer === 22) {
        return 631 * 335;
    } else if (answer === 23) {
        return 635 * 340;
    } else if (answer === 24) {
        return 643 * 341;
    } else if (answer === 25) {
        return 644 * 350;
    } else if (answer === 26) {
        return 647 * 351;
    } else if (answer === 27) {
        return 642 * 358;
    } else if (answer === 0) {
        return 640 * 360;
    }
};

// uncomment to see each iteration
// while (iter < 5000) {
//     iter++;
//     updateLumberCollectionArea();
//     // printLumberCollectionArea();
//     let [trees, lumber] = countLumber();
//     // console.log(`iter: ${iter}; current: ${trees}, ${lumber}; difference: ${trees - previousTrees}, ${lumber - previousLumber}`);
//     console.log(iter + ': ' + trees * lumber);
//     if (iter >= 577) {
//         console.log(trees * lumber === findLumberCollectionNumberForGivenNumber(iter));
//     }
//     previousTrees = trees;
//     previousLumber = lumber;
// }

console.log(findLumberCollectionNumberForGivenNumber(1000000000));
