import {input} from "./input";

const fabric = [[]];
const testInput = [
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2'
];

input.forEach((value) => {
    const [id, directions] = value.split(' @ ');
    const [location, movement] = directions.split(': ');
    const [x, y] = location.split(',').map((str) => Number(str));
    const [height, width] = movement.split('x').map((str) => Number(str));

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (!fabric[x + i]) {
                fabric[x + i] = [];
            }
            if (!fabric[x + i][y + j]) {
                fabric[x + i][y + j] = id;
            } else {
                fabric[x + i][y + j] = 'x';
            }
        }
    }
});

let santaSuitId = '';
input.forEach((value) => {
    const [id, directions] = value.split(' @ ');
    const [location, movement] = directions.split(': ');
    const [x, y] = location.split(',').map((str) => Number(str));
    const [height, width] = movement.split('x').map((str) => Number(str));

    let winner = true;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (fabric[x + i][y + j] !== id) {
                winner = false;
            }
        }
    }
    if (winner) {
        santaSuitId = id;
    }
});
console.log(santaSuitId);