import {input} from "./input";

const set = new Set();
let acc = 0;
let twiceFrequency;
const testFreq = [+3, +3, +4, -2, -4];
while (twiceFrequency === undefined) {
    input.forEach((value) => {
        acc = acc + value;
        if (set.has(acc) && twiceFrequency === undefined) {
            console.log("set contains " + acc);
            twiceFrequency = acc;
        }
        set.add(acc);
    });
}
console.log(twiceFrequency);