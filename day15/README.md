# Day 15

# Part 1

    ts-node part1.ts

And I thought [Day 7](https://github.com/jdk2pq/adventOfCode2018/tree/master/day7) was difficult...

This one has been the most challenging for me yet (as you can probably tell by how much `console.log()`ing I was doing.
 
I split finding the solution up over two days and probably put in 4-5 hours. But it was a weekend and I had a lot of free time, so it was a better use of my time than other things I could've been doing like...

<img src="https://i.imgur.com/UY3f7CR.jpg">

For part 1, I was really lost at first. I had to reread through the _very long_ problem description a few times before I fully understood what was going on. Then, I started by modeling the `Unit`, `Elf`, and `Goblin` classes, including how a single `Unit`'s turn would progress, thinking that if I had that structure set up, things would be a bit easier. And that was definitely true.
 
But the search to find the shortest path to a target really confused me, though I had the right idea. I borrowed _heavily_ from [this solution](https://github.com/albertobastos/advent-of-code-2018-nodejs/blob/master/src/d15.js) that was shared on the [subreddit thread for day 15 solutions](https://www.reddit.com/r/adventofcode/comments/a6chwa/2018_day_15_solutions/), especially in my `move()` function. 

Once I had that though, the rest came fairly easily, and it was just small adjustments to get the test inputs passing until I had a solution that worked.

# Part 2
 
    ts-node part2.ts
    
Part 2 was considerably easier and quicker to solve with the solution for part 1 already done (as is the case with most of these problems). The only thing I got a little stuck on was that the 3rd test case was mislabeled as "the second example" in the problem description. Couldn't figure out why my solution didn't match what that test case's provided solution, but then I realized that the test case was just mislabeled.