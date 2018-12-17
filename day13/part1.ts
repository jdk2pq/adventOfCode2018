import {input} from "./input";

const testInput = [
    '/->-\\        ',
    '|   |  /----\\',
    '| /-+--+-\\  |',
    '| | |  | v  |',
    '\\-+-/  \\-+--/',
    '  \\------/   '
];
const enum CART_DIRECTIONS {
    UP = '^',
    DOWN = 'v',
    LEFT = '<',
    RIGHT = '>',
    CRASHED = 'X'
}

class Cart {
    nextTurn = 'left';
    numTurns = 0;
    direction = CART_DIRECTIONS.DOWN;
    currentLocation = {
        x: 0,
        y: 0
    };
    savedValue = '|';

    constructor (val: CART_DIRECTIONS, currentLocation: { x: number, y: number }) {
        this.direction = val;
        if (this.direction === CART_DIRECTIONS.DOWN || this.direction === CART_DIRECTIONS.UP) {
            this.savedValue = '|';
        } else {
            this.savedValue = '-'
        }
        this.currentLocation = currentLocation;
    }

    toString = () => {
        return this.direction;
    };

    turnAtIntersection = () => {
        if (this.nextTurn === 'left') {
            if (this.direction === CART_DIRECTIONS.DOWN) {
                this.direction = CART_DIRECTIONS.RIGHT;
            } else if (this.direction === CART_DIRECTIONS.RIGHT) {
                this.direction = CART_DIRECTIONS.UP;
            } else if (this.direction === CART_DIRECTIONS.UP) {
                this.direction = CART_DIRECTIONS.LEFT;
            } else {
                this.direction = CART_DIRECTIONS.DOWN;
            }
            this.nextTurn = 'straight';
        } else if (this.nextTurn === 'straight') {
            this.nextTurn = 'right';
        } else {
            if (this.direction === CART_DIRECTIONS.DOWN) {
                this.direction = CART_DIRECTIONS.LEFT;
            } else if (this.direction === CART_DIRECTIONS.RIGHT) {
                this.direction = CART_DIRECTIONS.DOWN;
            } else if (this.direction === CART_DIRECTIONS.UP) {
                this.direction = CART_DIRECTIONS.RIGHT;
            } else {
                this.direction = CART_DIRECTIONS.UP;
            }
            this.nextTurn = 'left';
        }
        this.numTurns++;
    };

    turn = (slash: string) => {
        if (slash === '/') {
            if (this.direction === CART_DIRECTIONS.RIGHT) {
                this.direction = CART_DIRECTIONS.UP;
            } else if (this.direction === CART_DIRECTIONS.LEFT) {
                this.direction = CART_DIRECTIONS.DOWN;
            } else if (this.direction === CART_DIRECTIONS.UP) {
                this.direction = CART_DIRECTIONS.RIGHT;
            } else if (this.direction === CART_DIRECTIONS.DOWN) {
                this.direction = CART_DIRECTIONS.LEFT;
            }
        } else if (slash === '\\') {
            if (this.direction === CART_DIRECTIONS.RIGHT) {
                this.direction = CART_DIRECTIONS.DOWN;
            } else if (this.direction === CART_DIRECTIONS.LEFT) {
                this.direction = CART_DIRECTIONS.UP;
            } else if (this.direction === CART_DIRECTIONS.UP) {
                this.direction = CART_DIRECTIONS.LEFT;
            } else if (this.direction === CART_DIRECTIONS.DOWN) {
                this.direction = CART_DIRECTIONS.RIGHT;
            }
        }
    };

    updateLocation = (newLocation: { x: number, y: number }) => {
        this.currentLocation = newLocation;
    };
}

const inVals = input;
const track = [[]];
const printTrack = () => {
    for (let j = 0; j < track[0].length; j++) {
        let acc = '';
        for (let i = 0; i < track.length; i++) {
            acc = acc + track[i][j];
        }
        console.log(acc);
    }
};
let carts: Array<Cart> = [];
inVals.forEach((row, yIdx) => {
    const split = row.split('');
    split.forEach( (val, xIdx) => {
        if (!track[xIdx]) {
            track[xIdx] = [];
        }
        track[xIdx][yIdx] = val;
        if ([CART_DIRECTIONS.UP, CART_DIRECTIONS.DOWN, CART_DIRECTIONS.LEFT, CART_DIRECTIONS.RIGHT].includes(val as CART_DIRECTIONS)) {
            carts.push(new Cart(val as CART_DIRECTIONS, {x: xIdx, y: yIdx}));
        }
    });
});
// printTrack();

let crashedLocation = [];
let iter = 0;

const moveCarts = () => {
    carts = carts.sort((cart1: Cart, cart2: Cart) => {
        if (cart1.currentLocation.x === cart2.currentLocation.x) {
            return cart1.currentLocation.y - cart2.currentLocation.y;
        } else {
            return cart1.currentLocation.x - cart2.currentLocation.x;
        }
    });

    carts.forEach((cart: Cart) => {
        const cartVal = cart.direction;
        let nextVal;
        let nextLocation = [];
        if (cartVal === CART_DIRECTIONS.UP) {
            nextLocation = [cart.currentLocation.x, cart.currentLocation.y - 1];
        } else if (cartVal === CART_DIRECTIONS.DOWN) {
            nextLocation = [cart.currentLocation.x, cart.currentLocation.y + 1];
        } else if (cartVal === CART_DIRECTIONS.LEFT) {
            nextLocation = [cart.currentLocation.x - 1, cart.currentLocation.y];
        } else if (cartVal === CART_DIRECTIONS.RIGHT) {
            nextLocation = [cart.currentLocation.x + 1, cart.currentLocation.y];
        }
        nextVal = track[nextLocation[0]][nextLocation[1]];


        if (nextVal.direction) {
            console.log('CRASHED');
            // console.log(nextVal);
            // console.log(cart);
            crashedLocation = nextLocation;
            cart.direction = CART_DIRECTIONS.CRASHED;
        } else if (nextVal === '+') {
            cart.turnAtIntersection();
        } else if (nextVal === '/' || nextVal === '\\') {
            cart.turn(nextVal);
        }
        track[cart.currentLocation.x][cart.currentLocation.y] = cart.savedValue;
        cart.savedValue = nextVal;
        cart.updateLocation({ x: nextLocation[0], y: nextLocation [1] });
        track[nextLocation[0]][nextLocation[1]] = cart;
        // printTrack();

    });
};

while (crashedLocation.length === 0) {
    moveCarts();
    // console.log(iter + ': ');
    // printTrack();
    iter++;
    // console.log(iter);
}
console.log(crashedLocation);
// printTrack();
// console.log(iter);
