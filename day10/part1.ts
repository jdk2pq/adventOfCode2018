import maxBy = require('lodash/maxBy');
import minBy = require('lodash/minBy');
import {input} from "./input";

const testInput = [
    'position=< 9,  1> velocity=< 0,  2>',
    'position=< 7,  0> velocity=<-1,  0>',
    'position=< 3, -2> velocity=<-1,  1>',
    'position=< 6, 10> velocity=<-2, -1>',
    'position=< 2, -4> velocity=< 2,  2>',
    'position=<-6, 10> velocity=< 2, -2>',
    'position=< 1,  8> velocity=< 1, -1>',
    'position=< 1,  7> velocity=< 1,  0>',
    'position=<-3, 11> velocity=< 1, -2>',
    'position=< 7,  6> velocity=<-1, -1>',
    'position=<-2,  3> velocity=< 1,  0>',
    'position=<-4,  3> velocity=< 2,  0>',
    'position=<10, -3> velocity=<-1,  1>',
    'position=< 5, 11> velocity=< 1, -2>',
    'position=< 4,  7> velocity=< 0, -1>',
    'position=< 8, -2> velocity=< 0,  1>',
    'position=<15,  0> velocity=<-2,  0>',
    'position=< 1,  6> velocity=< 1,  0>',
    'position=< 8,  9> velocity=< 0, -1>',
    'position=< 3,  3> velocity=<-1,  1>',
    'position=< 0,  5> velocity=< 0, -1>',
    'position=<-2,  2> velocity=< 2,  0>',
    'position=< 5, -2> velocity=< 1,  2>',
    'position=< 1,  4> velocity=< 2,  1>',
    'position=<-2,  7> velocity=< 2, -2>',
    'position=< 3,  6> velocity=<-1, -1>',
    'position=< 5,  0> velocity=< 1,  0>',
    'position=<-6,  0> velocity=< 2,  0>',
    'position=< 5,  9> velocity=< 1, -2>',
    'position=<14,  7> velocity=<-2,  0>',
    'position=<-3,  6> velocity=< 2, -1>'
];

const inVals = input;
let plot = [[]];
class Point {
    position: number[];
    velocity: number[];
    constructor (position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }

    hasNeighbor = (): boolean => {
        if (plot[this.position[0] - 1] && plot[this.position[0] - 1][this.position[1]]) {
            return true;
        }
        if (plot[this.position[0] + 1] && plot[this.position[0] + 1][this.position[1]]) {
            return true;
        }
        if (plot[this.position[0]] && plot[this.position[0]][this.position[1] - 1]) {
            return true;
        }
        if (plot[this.position[0]] && plot[this.position[0]][this.position[1] + 1]) {
            return true;
        }
        if (plot[this.position[0] + 1] && plot[this.position[0] + 1][this.position[1] + 1]) {
            return true;
        }
        if (plot[this.position[0] - 1] && plot[this.position[0] - 1][this.position[1] - 1]) {
            return true;
        }
        if (plot[this.position[0] - 1] && plot[this.position[0] - 1][this.position[1] + 1]) {
            return true;
        }
        if (plot[this.position[0] + 1] && plot[this.position[0] + 1][this.position[1] - 1]) {
            return true;
        }
        return false;
    };

    setPosition = (newPosition) => {
        this.position = newPosition;
    };

    toString = () => {
        return '#';
    };
}
const regexReplacement = /position|=| |>|<|elocity/g;

const points = inVals.map((positionAndVelocity: string) => {
    const [positionStr, velocityStr] = positionAndVelocity.split(' v');
    const position = positionStr
        .replace(regexReplacement, '')
        .split(',')
        .map(str => {
            return +str;
        });
    const velocity = velocityStr
        .replace(regexReplacement, '')
        .split(',')
        .map(str => {
            return +str;
        });
    return new Point(position, velocity);
});
// console.log(minX + ' ' + maxX + ' ' + minY + ' ' + maxY);
points.forEach((point) => {
    if (!plot[point.position[0]]) {
        plot[point.position[0]] = [];
    }
    plot[point.position[0]][point.position[1]] = point;
});
let printed = false;
const print = () => {
    const maxX = maxBy(points, (point: Point) => point.position[0]).position[0];
    const minX = minBy(points, (point: Point) => point.position[0]).position[0];
    const maxY = maxBy(points, (point: Point) => point.position[1]).position[1];
    const minY = minBy(points, (point: Point) => point.position[1]).position[1];
    for (let y = minY; y <= maxY; y++) {
        let acc = '';
        let moreThanDots = false;
        for (let x = minX; x <= maxX; x++) {
            if (!plot[x] || !plot[x][y]) {
                acc += '.';
            } else {
                moreThanDots = true;
                acc += plot[x][y];
            }
        }
        if (moreThanDots) {
            console.log(`${acc}`);
        }
    }
    console.log('');
    printed = true;
};
let iter = 0;

const move = () => {
    const newPlot = [[]];
    points.forEach((point) => {
        if (!newPlot[point.position[0] + point.velocity[0]]) {
            newPlot[point.position[0] + point.velocity[0]] = [];
        }
        point.setPosition([point.position[0] + point.velocity[0], point.position[1] + point.velocity[1]]);
        newPlot[point.position[0]][point.position[1]] = point;
    });
    plot = newPlot;
    if (points.every((p) => p.hasNeighbor())) {
        console.log('printing on iter: ' + iter);
        print();
    }
};
while (!printed) {
    iter++;
    move();
}

