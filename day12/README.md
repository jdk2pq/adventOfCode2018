# Day 12

# Part 1

    ts-node part1.ts


# Part 2
 
    ts-node part2.ts
    
For part 2, I tried to see if I could just change the iterations from 20 to 50000000000, cause why not? What could I lose? Turns out that doesn't work. 

I skimmed the [Reddit thread](https://www.reddit.com/r/adventofcode/comments/a5eztl/2018_day_12_solutions/) top comments for day 12 and someone suggested to look for patterns in each generation's value.

I printed out the first 1000 iterations and noticed that after iteration 158, each successive iteration (159 and above) increases by +42. Using that logic, I just did a simple equation and got the right answer. Not much of a code change, other than printing out each generation's value.

FWIW, I also agree with the top comment (well, top comment when I looked at it, but here's a [permalink](https://www.reddit.com/r/adventofcode/comments/a5eztl/2018_day_12_solutions/ebm5nsh/) to the comment) that this problem was _very_ difficult to understand because it was written so poorly. I spent around 15-20 minutes just trying to wrap my head around the wording of the problem.