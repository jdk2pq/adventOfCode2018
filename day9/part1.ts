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

const inVals = input;
let playerScores = [];
let marbleNumber = 1;
let marbles = [];
let marbleLocation = 0;

const playMarbles = (numPlayers: number, lastMarble: number): number => {
    for (let i = 1; i <= numPlayers; i++) {
        if (marbleNumber <= lastMarble) {
            if (marbleNumber % 23 === 0) {
                if (marbleLocation - 7 > 0) {
                    marbleLocation = marbleLocation - 7;
                } else {
                    marbleLocation = (marbles.length) + marbleLocation - 7;
                }
                const toDelete = marbles[marbleLocation];
                if (!playerScores[i]) {
                    playerScores[i] = 0;
                }
                playerScores[i] = playerScores[i] + marbleNumber + toDelete;
                marbles.splice(marbleLocation, 1);
            } else {
                if (marbleNumber === 1) {
                    marbleLocation = 1;
                } else {
                    const calc = (marbleLocation + 2) % marbles.length;
                    if (calc === 0) {
                        marbleLocation = marbleLocation + 2;
                    } else {
                        marbleLocation = (marbleLocation + 2) % marbles.length;
                    }
                }
                marbles.splice(marbleLocation, 0, marbleNumber);
            }
            // console.log(`marble location: ${marbleLocation}`);

            marbleNumber++;
        } else {
            break;
        }
    }
    return max(playerScores);
};
inVals.forEach((nums) => {
    let [numPlayers, lastMarble] = nums;
    marbles = [0];
    playerScores = [];
    marbleNumber = 1;
    marbleLocation = 0;
    let result = 0;
    while (marbleNumber <= lastMarble) {
        result = playMarbles(numPlayers, lastMarble);
        // console.log(marbles);
    }
    console.log(`last marble number: ${marbleNumber}`);
    console.log(result);
});