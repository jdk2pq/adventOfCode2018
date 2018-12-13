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
const newGeneration = () => {
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
};

for (let i = 0; i < 20; i++) {
    min = 0;
    newGeneration();
}
let acc = 0;
for (let i = min; i < currentState.length; i++) {
    if (currentState[i] === '#') {
        acc = acc + i;
    }
}

console.log(acc);