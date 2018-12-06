import {input} from "./input";

const testInput = 'dabAcCaCBAcCcaDA';
const inVal = input;

let stillRemoving = true;
const split = inVal.split('');
while (stillRemoving) {
    for (let idx = 0; idx < split.length; idx++) {
        const singleLetter = split[idx];
        const isCapital = singleLetter === singleLetter.toUpperCase();
        if (isCapital) {
            if (idx !== 0 && singleLetter.toLowerCase() === split[idx - 1]) {
                split.splice(idx - 1, 2);
                stillRemoving = true;
                break;
            } else if (singleLetter.toLowerCase() === split[idx + 1]) {
                split.splice(idx, 2);
                stillRemoving = true;
                break;
            }
        } else {
            if (idx !== 0 && singleLetter.toUpperCase() === split[idx - 1]) {
                split.splice(idx - 1, 2);
                stillRemoving = true;
                break;
            } else if (singleLetter.toUpperCase() === split[idx + 1]) {
                split.splice(idx, 2);
                stillRemoving = true;
                break;
            }
        }
        stillRemoving = false;
    }
}
const remainingPolymers = split.join('');
console.log(remainingPolymers);
// console.log(remainingPolymers === 'dabCBAcaDA');
console.log('length: ' + remainingPolymers.length);