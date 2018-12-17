import minBy = require('lodash/minBy');
import {input} from "./input";


const board = [[]];
let elves: Array<Elf> = [];
let goblins: Array<Goblin> = [];
const freeSquare = '.';
let combatInProgress = true;
export class Unit {
    attackPower = 3;
    hp = 200;
    position = [];
    inRangeTargets = [];
    inRange = false;
    enemy: string;
    id: number;

    constructor (position: number[]) {
        this.position = position;
        this.id = Math.random() * 10;
    }

    damage = (attackPower: number) => {
        this.hp = this.hp - attackPower;
    };

    startTurn = () => {
        this.identifyInRangeTargets(true);
        if (combatInProgress && !this.inRange) {
            this.move();
        }
        if (combatInProgress) {
            this.identifyInRangeTargets(false);
        }
        if (combatInProgress && this.inRange) {
            this.attack();
        }
    };

    identifyInRangeTargets = (setCombat: boolean) => {
        this.inRange = false;
        let targets;
        this.inRangeTargets = [];
        if (this.enemy === 'E') {
            targets = elves;
        } else {
            targets = goblins;
        }
        if (targets.length > 0) {
            targets.forEach((unit: Unit) => {
                if (
                    (
                        unit.position[0] + 1 === this.position[0] && unit.position[1] === this.position[1]
                    ) ||
                    (
                        unit.position[0] - 1 === this.position[0] && unit.position[1] === this.position[1]
                    ) ||
                    (
                        unit.position[0] === this.position[0] && unit.position[1] + 1 === this.position[1]
                    ) ||
                    (
                        unit.position[0] === this.position[0] && unit.position[1] - 1 === this.position[1]
                    )
                ) {
                    this.inRangeTargets.push(unit);
                }
            });
            if (this.inRangeTargets.length > 0) {
                this.inRange = true;
            }
        } else {
            if (setCombat) {
                combatInProgress = false;
            }
        }
    };

    getSurrounding = (position: number[]) => {
        return [
            [position[0], position[1] - 1],
            [position[0] - 1, position[1]],
            [position[0] + 1, position[1]],
            [position[0], position[1] + 1]
        ];
    };

    move = () => {
        let paths = [[this.position]];
        const visited = {};
        visited[this.position.join(',')] = true;
        let moveToPosition;
        while (!moveToPosition) {
            // console.log(`moving ${this.toString()} ${this.position}`);
            let targetPaths = [];
            const newPaths = [];
            paths.forEach((path) => {
                // console.log(path[path.length - 1]);
                this.getSurrounding(path[path.length - 1]).forEach((position) => {
                    // console.log(`position: ${position}, ${board[position[0]][position[1]]}`);
                    const positionToStr = position.join(',');
                    if (!visited[positionToStr] && board[position[0]][position[1]].toString() === this.enemy) {
                        targetPaths.push([...path, position]);
                    } else if (!visited[positionToStr] && board[position[0]][position[1]] === freeSquare) {
                        // console.log(`newPath: ${[...path, position]}`);
                        newPaths.push([...path, position]);
                    }
                    visited[positionToStr] = true;
                });
            });

            // console.log(targetPaths);
            if (targetPaths.length > 0) {
                // console.log(`targetPaths longer than 0`);
                targetPaths = targetPaths.sort((path1, path2) => {
                    if (path1[path1.length - 1][1] === path2[path2.length - 1][1]) {
                        return path1[path1.length - 1][0] - path2[path2.length - 1][0];
                    } else {
                        return path1[path1.length - 1][1] - path2[path2.length - 1][1];
                    }
                });
                moveToPosition = targetPaths[0][1];
                // console.log(`moveToPosition: ${moveToPosition}`);
            }

            if (!moveToPosition) {
                paths = newPaths;
                // console.log(`paths.length: ${paths.length}`);
                if (paths.length === 0) {
                    moveToPosition = [];
                }
            }
        }
        if (moveToPosition.length > 0) {
            // console.log(`moving from ${this.position} to ${moveToPosition}`);
            board[this.position[0]][this.position[1]] = freeSquare;
            this.position = moveToPosition;
            board[moveToPosition[0]][moveToPosition[1]] = this;
        } else {
            // console.log(moveToPosition.length);
        }
    };

    attack = () => {
        const minHp = minBy(this.inRangeTargets, (target: Unit) => {
            // console.log(target);
            return target.hp;
        }).hp;
        const chosenTargetToAttack = this.inRangeTargets.filter((target) => target.hp === minHp).sort((target1: Unit, target2: Unit) => target1.position[1] === target2.position[1] ? target1.position[0] - target2.position[0] : target1.position[1] - target2.position[1])[0];
        chosenTargetToAttack.damage(this.attackPower);
        if (chosenTargetToAttack.hp <= 0) {
            // console.log(`changed ${chosenTargetToAttack.position[0]}, ${chosenTargetToAttack.position[1]} to .`);
            board[chosenTargetToAttack.position[0]][chosenTargetToAttack.position[1]] = freeSquare;
            if (this.enemy === 'E') {
                // console.log(elves);
                elves = elves.filter(elf => elf.id !== chosenTargetToAttack.id);
                // console.log(elves);
            } else {
                // console.log(goblins);
                goblins = goblins.filter(elf => elf.id !== chosenTargetToAttack.id);
                // console.log(goblins);
            }
        }
    }
}

export class Elf extends Unit {
    enemy = 'G';
    constructor (position: number[]) {
        super(position);
    }

    toString = () => {
        return `E`;
    };
}

export class Goblin extends Unit {
    enemy = 'E';
    constructor (position: number[]) {
        super(position);
    }

    toString = () => {
        return `G`;
    };
}


const testInput = [
    '#######',
    '#.G...#',
    '#...EG#',
    '#.#.#G#',
    '#..G#E#',
    '#.....#',
    '#######'
];

const testInput2 = [
    '#######',
    '#G..#E#',
    '#E#E.E#',
    '#G.##.#',
    '#...#E#',
    '#...E.#',
    '#######',
];

const testInput3 = [
    '#######',
    '#E..EG#',
    '#.#G.E#',
    '#E.##E#',
    '#G..#.#',
    '#..E#.#',
    '#######'
];

const testInput4 = [
    '#######',
    '#E.G#.#',
    '#.#G..#',
    '#G.#.G#',
    '#G..#.#',
    '#...E.#',
    '#######',
];

const testInput5 = [
    '#######',
    '#.E...#',
    '#.#..G#',
    '#.###.#',
    '#E#G#G#',
    '#...#G#',
    '#######'
];

const testInput6 = [
    '#########',
    '#G......#',
    '#.E.#...#',
    '#..##..G#',
    '#...##..#',
    '#...#...#',
    '#.G...G.#',
    '#.....G.#',
    '#########'
];

const invals = input;
invals.forEach((row, yIdx) => {
    row.split('').forEach((char, xIdx) => {
        let newVal: string | Unit = char;
        if (char === 'G') {
            newVal = new Goblin([xIdx, yIdx]);
            goblins.push(newVal);
        } else if (char === 'E') {
            newVal = new Elf([xIdx, yIdx]);
            elves.push(newVal);
        }
        if (!board[xIdx]) {
            board[xIdx] = [];
        }
        board[xIdx][yIdx] = newVal;
    });
});
let iter = 0;
const printBoard = () => {
    console.log(`Iteration: ${iter}`);
    for (let y = 0; y < board.length; y++) {
        let acc = '';
        for (let x = 0; x < board[0].length; x++) {
            acc = acc + board[x][y];
        }
        console.log(acc);
    }
    console.log('');
};
while (combatInProgress) {
    // printBoard();
    let combatBrokeIter = false;
    elves.concat(goblins).sort((u1: Unit, u2: Unit) => {
        if (u1.position[1] === u2.position[1]) {
            return u1.position[0] - u2.position[0];
        } else {
            return u1.position[1] - u2.position[1];
        }
    }).forEach((unit: Unit) => {
        if (elves.concat(goblins).map(unit => unit.id).includes(unit.id)) {
            unit.startTurn();
        }
        if (!combatInProgress) {
            combatBrokeIter = true;
        }
    });
    if (!combatBrokeIter) {
        iter++;
    }
}
const hpReduced = elves.concat(goblins).reduce((acc: number, unit: Unit) => {
    return acc + unit.hp;
}, 0);
console.log(iter);
console.log(hpReduced);
console.log(iter * hpReduced);