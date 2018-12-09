# Day 9

# Part 1

    ts-node part1.ts
    
I wrote a solution that was able to get 5 out of the 6 test inputs and test solutions correct. Couldn't figure out why I was missing one every time.

I checked the subreddit for any clues and someone had suggested that you can't just subtract 7 from the current location of the marble because there's a chance you'll go into the negatives.

After realizing that error, I fixed my solution to check if the marble location was less than 0 and calculate the new location by wrapping around using the length of the marble circle. Things worked after that!

# Part 2

 **Do note a different command than the other days to run `part2.ts`, since you will also probably need to increase the JavaScript heap space. More on that below.**
 
    node -r ts-node/register --max-old-space-size=8192 part2.ts
    

I really hoped I could just multiply the input max marble number by 100 and just wait it out, but after waiting ~10 minutes with still no solution, I decided to rewrite things.

I got _a lot_ of hints from the subreddit for this one. Everyone suggested using a doubly linked circular list, so that was the first clue that I got.

Then I found someone else's solution in TypeScript and saw that they were building a `Node` and `List` class to keep track of everything, rather than using arrays like I had been doing in the first part.

Finally, it was stated that the insertion time had to be `O(1)` to really be able to run in a decent amount of time once you're multiplying the max marble number by 100.

With these clues in mind, I wrote a `Marble` class that was similar to the `Node` class I saw on the subreddit. It was basically just a node in the doubly-linked circular list and had `addMarble` and `removeMarble` functions to change the pointers of the next and previous marbles.

This made things _a lot_ simpler and just easier to read/understand. I did get a little tripped up in the case where `marbleNumber % 23 === 0` because I was setting the `workingMarble` to one less than I should have been, and I also incorrectly decremented `length`. I also wasn't resetting the `workingMarble` when I added a new marble. After fixing those errors, I could at least run the test inputs fine and get the right answers.

Finally, I thought things would work just fine for multiplying by 100 to my input, but they didn't. I was running out of JavaScript heap space when I tried running with `ts-node`. I googled a bit, found a way to increase the heap space in `Node.js`, and things ran in just 6 seconds