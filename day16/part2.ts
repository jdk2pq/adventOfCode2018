import {input, input2} from "./input";
import cloneDeep = require('lodash/cloneDeep');
import values = require('lodash/values');

let registers = [0, 0, 0, 0];
const addr = (a: number, b: number, c: number) => {
    registers[c] = registers[a] + registers[b];
    return registers[c];
};
const addi = (a: number, b: number, c: number) => {
    registers[c] = registers[a] + b;
    return registers[c];
};
const mulr = (a: number, b: number, c: number) => {
    registers[c] = registers[a] * registers[b];
    return registers[c];
};
const muli = (a: number, b: number, c: number) => {
    registers[c] = registers[a] * b;
    return registers[c];
};
const banr = (a: number, b: number, c: number) => {
    registers[c] = registers[a] & registers[b];
    return registers[c];
};
const bani = (a: number, b: number, c: number) => {
    registers[c] = registers[a] & b;
    return registers[c];
};
const borr = (a: number, b: number, c: number) => {
    registers[c] = registers[a] | registers[b];
    return registers[c];
};
const bori = (a: number, b: number, c: number) => {
    registers[c] = registers[a] | b;
    return registers[c];
};
const setr = (a: number, b: number, c: number) => {
    registers[c] = registers[a];
    return registers[c];
};
const seti = (a: number, b: number, c: number) => {
    registers[c] = a;
    return registers[c];
};
const gtir = (a: number, b: number, c: number) => {
    if (a > registers[b]) {
        registers[c] = 1;
    } else {
        registers[c] = 0;
    }
    return registers[c];
};
const gtri = (a: number, b: number, c: number) => {
    if (registers[a] > b) {
        registers[c] = 1;
    } else {
        registers[c] = 0;
    }
    return registers[c];
};
const gtrr = (a: number, b: number, c: number) => {
    if (registers[a] > registers[b]) {
        registers[c] = 1;
    } else {
        registers[c] = 0;
    }
    return registers[c];
};
const eqir = (a: number, b: number, c: number) => {
    if (a === registers[b]) {
        registers[c] = 1;
    } else {
        registers[c] = 0;
    }
    return registers[c];
};
const eqri = (a: number, b: number, c: number) => {
    if (registers[a] === b) {
        registers[c] = 1;
    } else {
        registers[c] = 0;
    }
    return registers[c];
};
const eqrr = (a: number, b: number, c: number) => {
    if (registers[a] === registers[b]) {
        registers[c] = 1;
    } else {
        registers[c] = 0;
    }
    return registers[c];
};
const allOpcodes = [
    addr,
    addi,
    mulr,
    muli,
    banr,
    bani,
    borr,
    bori,
    setr,
    seti,
    gtir,
    gtri,
    gtrr,
    eqir,
    eqri,
    eqrr
];
const opcodeLookup = {
    0: bani,
    1: banr,
    2: muli,
    3: setr,
    4: bori,
    5: eqrr,
    6: gtir,
    7: mulr,
    8: gtrr,
    9: seti,
    10: gtri,
    11: eqri,
    12: addi,
    13: borr,
    14: eqir,
    15: addr
};

const opcodeNames = [
    'addr',
    'addi',
    'mulr',
    'muli',
    'banr',
    'bani',
    'borr',
    'bori',
    'setr',
    'seti',
    'gtir',
    'gtri',
    'gtrr',
    'eqir',
    'eqri',
    'eqrr'
];
const testInput = [
    [
        'Before: [3, 2, 1, 1]',
        '9 2 1 2',
        'After:  [3, 2, 2, 1]'
    ]
];

const inVals = input;
inVals.forEach((sample: string[]) => {
    const before = sample[0].split(' [')[1].split(', ').map((num) => +num.replace('\]', ''));
    // console.log(before);
    const instruction = sample[1].split(' ').map((num) => +num);
    // console.log(instruction);
    const after = sample[2].split(' [')[1].split(', ').map((num) => +num.replace('\]', ''));
    // console.log(after);
    const filteredOpcodes = allOpcodes.filter((opcode) => !values(opcodeLookup).includes(opcode));
    const trueForOpcodes = filteredOpcodes.map((opcodeFn) => {
        registers = cloneDeep(before);
        opcodeFn(instruction[1], instruction[2], instruction[3]);
        // console.log(opcodeNames[opcodeIdx] + ': ' +registers);
        if (registers[0] === after[0] && registers[1] === after[1] && registers[2] === after[2] && registers[3] === after[3]) {
            return opcodeNames[allOpcodes.indexOf(opcodeFn)];
        } else {
            return ''
        }
    }).filter(str => str.length > 0);
    if (trueForOpcodes.length === 1) {
        console.log(sample + ' ' + trueForOpcodes);
    }
});
registers = [0, 0, 0, 0];
input2.forEach((instructionStr) => {
    const [opcode, a, b, c] = instructionStr.split(' ').map(num => +num);
    opcodeLookup[opcode](a, b, c);
});
console.log(registers[0]);
