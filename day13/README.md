# Day 13

# Part 1

    ts-node part1.ts

Part 1 nearly had me stumped because I _could not_ figure out an issue in my code that kept giving me the wrong answer for my input to the puzzle, but the correct solution for the test input provided in the problem description.
 
 After staring at my code, changing things arbitrarily without luck, scouring the subreddit for any obvious gotchas, and putting the code away for a night until the following day, I quickly realized I had a stray line in my code that was setting a `Cart`s previous value, during a move, to a '|'.
 
    turnAtIntersection = () => {
        if (this.nextTurn === 'left') {
            if (this.direction === CART_DIRECTIONS.DOWN) {
                this.direction = CART_DIRECTIONS.RIGHT;
            } else if (this.direction === CART_DIRECTIONS.RIGHT) {
                this.direction = CART_DIRECTIONS.UP;
                this.savedValue = '| # the offending line
                ...              

I think it was just a bad copy-paste that I somehow didn't catch and also wasn't causing any issues for me in the test solution. For my real input though, that one line was changing the entire track as the `Cart`s progressed through it. **face-palm**

# Part 2
 
    ts-node part2.ts
    
Figured this one out relatively quickly. The only minor hiccup was that I was modifying the array of still-functioning carts while I was `forEach`ing over the original array. This caused carts to move after they were already marked as crashed and removed from the tracks. I added a check at the beginning of the `moveCarts` function to ensure the cart being operated on was still in the array, and that led to the correct solution.
    
