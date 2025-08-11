# Mario Kart Array Challenge Solution (Revised) 🏁

Let me work through each step:

## Starting Grid:

```javascript
let racePositions = ["Mario", "Luigi", "Peach", "Yoshi", "Bowser", "Toad"];
```

## Step-by-step solution:

1. **Blue Shell Strike!** - Mario falls to last

```javascript
let mario = racePositions.shift(); // Remove Mario from 1st
racePositions.push(mario); // Add him to last
// ["Luigi", "Peach", "Yoshi", "Bowser", "Toad", "Mario"]
```

2. **Lightning Bolt!** - Last racer (Mario) moves to 1st

```javascript
let lastRacer = racePositions.pop(); // Remove Mario from last
racePositions.unshift(lastRacer); // Add him to 1st
// ["Mario", "Luigi", "Peach", "Yoshi", "Bowser", "Toad"]
```

3. **Mushroom Boost!** - Last racer (Toad) moves to 1st

```javascript
let boostRacer = racePositions.pop(); // Remove Toad from last
racePositions.unshift(boostRacer); // Add him to 1st
// ["Toad", "Mario", "Luigi", "Peach", "Yoshi", "Bowser"]
```

4. **Red Shell Chain!** - 1st (Toad) then 2nd (Mario) both drop to last

```javascript
let firstHit = racePositions.shift(); // Remove Toad from 1st
racePositions.push(firstHit); // Add to last
// ["Mario", "Luigi", "Peach", "Yoshi", "Bowser", "Toad"]

let secondHit = racePositions.shift(); // Remove Mario from 1st
racePositions.push(secondHit); // Add to last
// ["Luigi", "Peach", "Yoshi", "Bowser", "Toad", "Mario"]
```

5. **Star Power!** - Last racer (Mario) charges to 1st

```javascript
let starRacer = racePositions.pop(); // Remove Mario from last
racePositions.unshift(starRacer); // Add to 1st
// ["Mario", "Luigi", "Peach", "Yoshi", "Bowser", "Toad"]
```

6. **Banana Slip!** - 1st place (Mario) falls to last

```javascript
let slippedRacer = racePositions.shift(); // Remove Mario from 1st
racePositions.push(slippedRacer); // Add to last
// ["Luigi", "Peach", "Yoshi", "Bowser", "Toad", "Mario"]
```

7. **Triple Mushroom!** - Last racer (Mario) rockets to 1st

```javascript
let tripleRacer = racePositions.pop(); // Remove Mario from last
racePositions.unshift(tripleRacer); // Add to 1st
// ["Mario", "Luigi", "Peach", "Yoshi", "Bowser", "Toad"]
```

8. **Final Chaos!** - Multiple position changes with splice

```javascript
// Before: ["Mario", "Luigi", "Peach", "Yoshi", "Bowser", "Toad"]
//          0        1        2        3        4         5

let second = racePositions.splice(1, 1)[0]; // Remove Luigi (2nd)
let third = racePositions.splice(1, 1)[0]; // Remove Peach (was 3rd, now 2nd)
let fourth = racePositions.splice(1, 1)[0]; // Remove Yoshi (was 4th, now 2nd)

// Current array: ["Mario", "Bowser", "Toad"]

racePositions.splice(1, 0, fourth); // Insert Yoshi at 2nd
racePositions.splice(4, 0, second); // Insert Luigi at 5th
racePositions.push(third); // Insert Peach at 6th

// ["Mario", "Yoshi", "Bowser", "Toad", "Luigi", "Peach"]
```

## Final Result:

```javascript
["Mario", "Yoshi", "Bowser", "Toad", "Luigi", "Peach"];
```

**Final Race Positions:**
1st: Mario 👑
2nd: Yoshi
3rd: Bowser
4th: Toad
5th: Luigi
6th: Peach

Mario had quite the comeback story - went from 1st to last multiple times but managed to finish 1st! 🏁

# Mario Kart Array Challenge (Revised) 🏁

You're managing the race positions during an intense Mario Kart race! Each array manipulation represents what happens during the race.

## Starting Grid:

```javascript
let racePositions = ["Mario", "Luigi", "Peach", "Yoshi", "Bowser", "Toad"];
// Position:             1st    2nd    3rd    4th    5th     6th
```

## Race Events (perform these in order):

1. **Blue Shell Strike!** 💥 - Mario (1st place) gets hit by a blue shell and falls to last place

   - _Use: shift() and push()_

2. **Lightning Bolt!** ⚡ - Everyone shrinks except the last racer, who overtakes everyone and moves to 1st

   - _Use: pop() and unshift()_

3. **Mushroom Boost!** 🍄 - The current last place racer uses a mushroom and moves to 1st place

   - _Use: pop() and unshift()_

4. **Red Shell Chain!** 🔴 - The current 1st place gets hit and drops to last, then 2nd place also gets hit and drops to last

   - _Use: shift() and push() twice_

5. **Star Power!** ⭐ - The current last place racer activates a star and charges to 1st place

   - _Use: pop() and unshift()_

6. **Banana Slip!** 🍌 - The current 1st place slips and falls to last place

   - _Use: shift() and push()_

7. **Triple Mushroom!** 🍄🍄🍄 - The current last place uses triple mushrooms to rocket to 1st place

   - _Use: pop() and unshift()_

8. **Final Chaos!** 💥 - In the final stretch, use splice() to make these three changes simultaneously:
   - Remove the racer in 2nd place and move them to 5th place
   - Remove the racer in 3rd place and move them to 6th place
   - Remove the racer in 4th place and move them to 2nd place

## Your Challenge:

Apply each manipulation in order and tell me the final race positions!

**What does your final `racePositions` array look like?**

_This version uses only the basic array methods until the final splice challenge!_
