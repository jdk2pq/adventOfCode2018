import {input} from "./input";
import min = require('lodash/min');

const testInput = 'dabAcCaCBAcCcaDA';
const inVal = input;

const split = inVal.split('');
const shortestPolymers: number[] = [];
const abcs = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];
abcs.forEach(letterToRemove => {
    const removedLetterSplit = split.filter((l) => l.toLowerCase() !== letterToRemove);
    // console.log(removedLetterSplit);
    let stillRemoving = true;
    while (stillRemoving) {
        for (let idx = 0; idx < removedLetterSplit.length; idx++) {
            const singleLetter = removedLetterSplit[idx];
            const isCapital = singleLetter === singleLetter.toUpperCase();
            if (isCapital) {
                if (idx !== 0 && singleLetter.toLowerCase() === removedLetterSplit[idx - 1]) {
                    removedLetterSplit.splice(idx - 1, 2);
                    stillRemoving = true;
                    break;
                } else if (singleLetter.toLowerCase() === removedLetterSplit[idx + 1]) {
                    removedLetterSplit.splice(idx, 2);
                    stillRemoving = true;
                    break;
                }
            } else {
                if (idx !== 0 && singleLetter.toUpperCase() === removedLetterSplit[idx - 1]) {
                    removedLetterSplit.splice(idx - 1, 2);
                    stillRemoving = true;
                    break;
                } else if (singleLetter.toUpperCase() === removedLetterSplit[idx + 1]) {
                    removedLetterSplit.splice(idx, 2);
                    stillRemoving = true;
                    break;
                }
            }
            stillRemoving = false;
        }
    }
    shortestPolymers.push(removedLetterSplit.length);
});
// console.log(shortestPolymers);
console.log(min(shortestPolymers));