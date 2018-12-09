# Day 7

# Part 1

    ts-node part1.ts
    
This one was the toughest one yet and took me a considerable amount of time because I kept assuming that once you had started on a single node, you could not continue on another path. 

Only when I read through the subreddit and saw people suggest that others were making the same mistake did I realize that I shouldn't assume you could not then go to another starting node. 

Turns out my code was right, but I was just resetting everything between starting on new start node because I assumed there were multiple paths one could take, some successful, some not.

# Part 2

    ts-node part1.ts
    
Oh man, this one was complicated too. I wasn't being careful about how I expired steps out of each of the arrays I was maintaining, and I ended up getting myself into so many infinite while loops.

After I relaxed a little, went through a couple of test cases manually, and saw how my solution was breaking down, it became a lot easier to see my mistakes. While I wanted to do things quickly to get those coveted fake internet points, I should have slowed down and realized my errors earlier. 
