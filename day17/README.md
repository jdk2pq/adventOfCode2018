# Day 17

# Part 1 & 2

    ts-node part1.ts
    
I had a general idea of how to accomplish this with recursion, but got a little tripped up in trying to write the function that would recurse through each square correctly. 

Back on the [subreddit Day 17 solutions thread](https://www.reddit.com/r/adventofcode/comments/a6wpup/2018_day_17_solutions/), I found [this solution](https://github.com/andreasgruenh/advent-of-code/blob/498bc454de08abaa7d8efb6b1220410d3b5e5ff6/TypeScript/src/2018/17.ts#L45) linked and used the `fillFrom` function to help guide the cases to check for in my `turnOnWater` function. But I did things a bit differently.

I wasn't originally checking that the y values were between the `yMin` and `yMax`, only that it was `<= yMax`, so I ended up with answers that were 2-4 water squares off. It took me a bit to realize why.

Part 2 was very easy after solving part 1, but part 1 was pretty in depth and took me a couple hours, so I'm not complaining.