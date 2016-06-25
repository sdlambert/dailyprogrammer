// Description

// Scrabble is a popular word game where players remove tiles with letters on them from a bag and use them to create words on a board. The total number of tiles as well as the frequency of each letter does not change between games.

// For this challenge we will be using the tile set from the English edition, which has 100 tiles total. Here's a reference for the distribution and point value of each tile

// Input Description

// The tiles already in play are inputted as an uppercase string. For example, if 14 tiles have been removed from the bag and are in play, you would be given an input like this:

// AEERTYOXMCNB_S

// Output Description

// You should output the tiles that are left in the bag. The list should be in descending order of the quantity of each tile left in the bag, skipping over amounts that have no tiles.

// In cases where more than one letter has the same quantity remaining, output those letters in alphabetical order, with blank tiles at the end.

// Each tile will be represented by the letter that appears on it, with the exception that blank tiles are represented by underscores _.

// 10: E
// 9: I
// 8: A
// 7: O
// 5: N, R, T
// 4: D, L, U
// 3: G, S
// 2: F, H, P, V, W
// 1: B, C, J, K, M, Q, Y, Z, _
// 0: X

// If more tiles have been removed from the bag than possible, such as 3 Qs, you should give a helpful error message instead of printing the list.

// Invalid input. More Q's have been taken from the bag than possible.

function remainingTiles (tiles) {
	var bag = {"E": 12, "A": 9, "I": 9, "O": 8, "N": 6, "R": 6, "T": 6, "L": 4,
	           "S": 4,  "U": 4, "D": 4, "G": 3, "_": 2, "B": 2, "C": 2, "M": 2,
	           "P": 2,  "F": 2, "H": 2, "V": 2, "W": 2, "Y": 2, "K": 1, "J": 1,
	           "X": 1,  "Q": 1, "Z": 1 },
	    tileArr = tiles.split(""),
	    remaining = [],
	    amount, char;

  tileArr.forEach(function (tile) {
  	bag[tile]--;
  	if (bag[tile] < 0)
  		remaining = "Invalid input. More " + tile + "'s have been taken from the bag than possible.";
  });

  if (typeof remaining !== "string") {
  	// Add characters to a 2D array at index [amount]
  	for (amount = 12; amount >= 0; amount--) {
  		for (char in bag) {
  			if (bag[char] === amount) {
  				if (!remaining[amount])
  					remaining[amount]= [];
  				remaining[amount].push(char);
  		  }
  		}
  	}
  	// Sort and join, converting to array of strings
  	for (amount = 12; amount >= 0; amount--) {
  		if (remaining[amount]) {
  			remaining[amount].sort();
  			remaining[amount] = amount + ": " + remaining[amount].join(", ");
  		}
  	}
  	// Filter empty array indices, reverse and join, convert to single string
  	remaining = String(remaining.filter(function (val) {
  		return val !== undefined;
  	}).reverse().join("\n"));
  }

  return remaining;
}

// console.log(remainingTiles("AEERTYOXMCNB_S"));
// console.log(remainingTiles("PQAREIOURSTHGWIOAE_"));
// console.log(remainingTiles("LQTOONOEFFJZT"));
// console.log(remainingTiles("AXHDRUIOR_XHJZUQEE"));