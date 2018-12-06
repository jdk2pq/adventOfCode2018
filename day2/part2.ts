import {input} from "./input";
import forOwn = require('lodash/forOwn');
let exactlyTwoTimesCount = 0;
let exactlyThreeTimesCount = 0;

const testInput = [
    'abcde',
    'fghij',
    'klmno',
    'pqrst',
    'fguij',
    'axcye',
    'wvxyz'
];
const valuesUsed = input;
let word1 = '';
let word2 = '';
valuesUsed.forEach((w1) => {
    valuesUsed.forEach((w2) => {
        let oneOff = false;
        let twoOff = false;
        w1.split('').forEach((letter, idx) => {
            if (letter !== w2.split('')[idx] && !oneOff) {
                oneOff = true;
            } else if (letter !== w2.split('')[idx] && oneOff) {
                twoOff = true;
            }
        });
        if (!twoOff && oneOff) {
            word1 = w1;
            word2 = w2;
        }
        // else {
            // console.log(w1 + ' ' + w2 + ' ' + oneOff + ' ' + twoOff);
        // }
    })
});
console.log(word1);
console.log(word2);