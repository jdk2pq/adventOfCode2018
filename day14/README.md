# Day 14

# Part 1 & 2

    node -r ts-node/register --max-old-space-size=8192 part1.ts

Adding some more heap space probably helps for the speed of this one.

Originally, I was `concat`'ing the new elements to the array and reassigning the `recipes` array with each new recipe. I let that run for the first part till it finished...and 11 minutes later, I had the right answer.

For part 2, I knew I had to save a lot of time. Turns out `concat`'ing and assigning to a new array with every iteration is **really inefficient**! Why not just `.push` and spread (`...`) the elements to add? Waaaaaay faster.

I just picked a big number (as suggested by the [subreddit](https://www.reddit.com/r/adventofcode/comments/a61ojp/2018_day_14_solutions/)) and looked for the index of my input after that many recipes had been added. Not the perfect solution, but it worked!