import maxBy = require('lodash/maxBy');
import {input, inputInitialState} from "./input";

const testInitialState = '#..#.#..##......###...###';
const initialState = inputInitialState;

const testInput = [
    '...## => #',
    '..#.. => #',
    '.#... => #',
    '.#.#. => #',
    '.#.## => #',
    '.##.. => #',
    '.#### => #',
    '#.#.# => #',
    '#.### => #',
    '##.#. => #',
    '##.## => #',
    '###.. => #',
    '###.# => #',
    '####. => #'
];
const inVals = input;
const rules = inVals.map((rule) => rule.split(' => '));
const onlyPreviousGenerations = rules.map((rule) => rule[0]);
const maxBefore = maxBy(rules, (rule: string) => rule[0].split('').filter((char) => char === '.').length)[0].split('').filter((char) => char === '.').length;
let min = 0;
let currentState = initialState.split('');
let acc = 0;
let previousAdd = 0;
let add = 0;

const newGeneration = (gen: number) => {
    const newGen = [];
    for (let i = min - maxBefore; i <= currentState.length; i++) {
        const plantStr = (currentState[i - 2] || '.') + (currentState[i - 1] || '.') + (currentState[i] || '.') + (currentState[i + 1] || '.') + (currentState[i + 2] || '.');
        if (onlyPreviousGenerations.includes(plantStr)) {
            const foundRulePlant = rules.find((rule) => rule[0] === plantStr)[1];
            newGen[i] = foundRulePlant;
            if (foundRulePlant === '#' && i < min) {
                min = i;
            }
        }
    }
    currentState = newGen;
    add = 0;
    for (let i = min; i < currentState.length; i++) {
        if (currentState[i] === '#') {
            add = add + i;
        }
    }
    // console.log(`gen: ${gen+1} add: ${add} diff: ${Math.abs(add - previousAdd)}`);
    previousAdd = add;
};


for (let i = 0; i < 1000; i++) {
    min = 0;
    newGeneration(i);
}

console.log(6697 + ((50000000000 - 159) * 42));