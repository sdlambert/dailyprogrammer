// Description
// Critical hits work a bit differently in this RPG. If you roll the maximum value on a die, you get to roll the die again and add both dice rolls to get your final score. Critical hits can stack indefinitely -- a second max value means you get a third roll, and so on. With enough luck, any number of points is possible.
// Input
//     d -- The number of sides on your die.
//     h -- The amount of health left on the enemy.
// Output
// The probability of you getting h or more points with your die.

function rollForCrit(d, h) {
  var odds = 0,
      i;

	if (h <= d)
    for (i = 1; i <= d; i++) {
      if (i >= h)
        odds += 1/d;
    }
  else
    odds = 1/d * rollForCrit(d, h - d);

  return odds;
}

console.log(rollForCrit(4, 1));
console.log(rollForCrit(4, 4));
console.log(rollForCrit(4, 5));
console.log(rollForCrit(4, 6));
console.log(rollForCrit(1, 10));
console.log(rollForCrit(100, 200));
console.log(rollForCrit(8, 20));