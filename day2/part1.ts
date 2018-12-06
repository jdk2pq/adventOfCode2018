import {input} from "./input";
import forOwn = require('lodash/forOwn');
let exactlyTwoTimesCount = 0;
let exactlyThreeTimesCount = 0;

const testInput = [
    'abcdef',
    'bababc',
    'abbcde',
    'abcccd',
    'aabcdd',
    'abcdee',
    'ababab'
];
input.forEach((word) => {
    const letterMap = {};
    let addedTwo = false, addedThree = false;
    word.split('').forEach((letter) => {
        if (!letterMap[letter]) {
            letterMap[letter] = 1;
        } else {
            letterMap[letter] = letterMap[letter] + 1;
        }
    });
    forOwn(letterMap, (value, key) => {
        if (value === 2 && !addedTwo) {
            exactlyTwoTimesCount = exactlyTwoTimesCount + 1;
            addedTwo = true;
        }
        if (value === 3 && !addedThree) {
            exactlyThreeTimesCount = exactlyThreeTimesCount + 1;
            addedThree = true;
        }
    })
});
console.log(exactlyTwoTimesCount * exactlyThreeTimesCount);