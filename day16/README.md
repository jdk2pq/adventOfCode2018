# Day 16

# Part 1

    ts-node part1.ts


# Part 2
 
    ts-node part2.ts
    
Both of these were a lot of fun, and I understood them quickly compared to some of the more recent problems that have taken up to a half hour to "get" (_looking at you, [Day 12](https://github.com/jdk2pq/adventOfCode2018/tree/master/day12) and [Day 15](https://github.com/jdk2pq/adventOfCode2018/tree/master/day15)_). 

It reminded me of a topic in my university's data structures class where we studied x86 and used a Turing-complete machine language built by the instructor called [IBCM](http://pegasus.cs.virginia.edu/ibcm/).

To figure out what opcodes were which, I used deductive, Clue-style reasoning. I found the samples where there was only one possible code that could've produced the result and slowly whittled down the list of unknown opcodes by comparing it with the list of known opcodes.

Once every opcode was found and my opcode-to-function lookup `Object` was complete, I ran the program and got the right answer.