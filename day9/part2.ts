import max = require('lodash/max');
import {input} from "./input";

const testInput = [
    [9, 25],
    [10, 1618],
    [13, 7999],
    [17, 1104],
    [21, 6111],
    [30, 5807]
];

class Marble {
    marbleNumber: number;
    nextMarble: Marble;
    previousMarble: Marble;

    constructor (marbleNumber: number) {
        this.marbleNumber = marbleNumber;
        this.nextMarble = this;
        this.previousMarble = this;
    }

    addMarble = (newMarbleNumber: number, listLength: number): Marble => {
        const marbleToAdd = new Marble(newMarbleNumber);
        if (listLength === 1) {
            this.nextMarble = marbleToAdd;
            this.previousMarble = marbleToAdd;
            marbleToAdd.nextMarble = this;
            marbleToAdd.previousMarble = this;
        } else {
            const nextMarble = this.nextMarble;
            marbleToAdd.previousMarble = this;
            nextMarble.previousMarble = marbleToAdd;
            marbleToAdd.nextMarble = nextMarble;
            this.nextMarble = marbleToAdd;
        }
        return marbleToAdd;
    };

    removeMarble = (): number => {
        const nextMarble = this.nextMarble;
        const previousMarble = this.previousMarble;
        nextMarble.previousMarble = previousMarble;
        previousMarble.nextMarble = nextMarble;
        return this.marbleNumber;
    }
}
const inVals = input;
let playerScores = [];
let workingMarble = new Marble(0);
let marbleNumber = 1;
let length = 1;

const playMarbles = (numPlayers: number, lastMarble: number): number => {
    for (let player = 1; player <= numPlayers; player++) {
        if (marbleNumber <= lastMarble) {
            if (marbleNumber % 23 === 0) {
                workingMarble = workingMarble
                    .previousMarble
                    .previousMarble
                    .previousMarble
                    .previousMarble
                    .previousMarble
                    .previousMarble;
                if (!playerScores[player]) {
                    playerScores[player] = 0;
                }
                playerScores[player] = playerScores[player] + marbleNumber + workingMarble.previousMarble.removeMarble();
            } else {
                workingMarble = workingMarble.nextMarble.addMarble(marbleNumber, length);
                length++;
            }
            marbleNumber++;
        } else {
            break;
        }
    }
    return max(playerScores);
};
const multiplier = 100;
inVals.forEach((nums) => {
    let [numPlayers, lastMarble] = nums;
    lastMarble = lastMarble * multiplier;
    playerScores = [];
    marbleNumber = 1;
    let result = 0;
    workingMarble = new Marble(0);
    while (marbleNumber <= lastMarble) {
        result = playMarbles(numPlayers, lastMarble);
    }
    console.log(result);
});