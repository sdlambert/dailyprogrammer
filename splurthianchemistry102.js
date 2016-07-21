var names = require('./data/splurthianelements.json').names;

function getElementSymbols (names) {
	var i,
	    j,
	    dupes,
	    elementName,
	    symbolStr = "",
	    symbols = [],
	    validSymbolArr = [];

	for (i = 0; i < names.length; i++) {
		elementName = names[i];
		dupes = findDuplicates(elementName);

		// get first letter of symbol
		// iterate through characters, check first letter against duplicates
		j = 0;

		do {
			if(dupes.indexOf(elementName[j]) === -1)
				symbolStr += elementName[j].toUpperCase();
			else
				j++;
		} while (symbolStr === "" && j < elementName.length - 1);

		// get second letter
		// will be the next valid
		// if valid, place in valid symbol array
		// iterate through valid symbol array, check against all symbols
		// pick first one, add to symbols array

		validSymbolArr[i].push(symbolStr);


	}

	return symbols;
}

function findDuplicates (name) {
	var chars = name.toLowerCase().split(""),
	    dupes = [],
	    i;

	chars.forEach(function (i, idx, arr) {
		if (arr.indexOf(i, idx + 1) !== -1 && dupes.indexOf(i) === -1)
			dupes.push(i);
	});

  return dupes;
}

console.log(getElementSymbols(names));