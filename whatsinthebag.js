var remainingTiles = function (tiles) {
	var bag = {"E": 12, "A": 9, "I": 9, "O": 8, "N": 6, "R": 6, "T": 6, "L": 4,
	           "S": 4,  "U": 4, "D": 4, "G": 3, "_": 2, "B": 2, "C": 2, "M": 2,
	           "P": 2,  "F": 2, "H": 2, "V": 2, "W": 2, "Y": 2, "K": 1, "J": 1,
	           "X": 1,  "Q": 1, "Z": 1 },
	    tileArr = tiles.split(""),
	    remaining = [],
	    amount, char;

  tileArr.forEach(function (tile) {
  	bag[tile]--;
  	if (bag[tile] < 0) {
  		remaining = "Invalid input. More " + tile + "'s have been taken from the bag than possible.";
  	}
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
};

// console.log(remainingTiles("AEERTYOXMCNB_S"));
// console.log(remainingTiles("PQAREIOURSTHGWIOAE_"));
// console.log(remainingTiles("LQTOONOEFFJZT"));
// console.log(remainingTiles("AXHDRUIOR_XHJZUQEE"));
