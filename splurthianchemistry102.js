var names = require('./data/splurthianelements.json').names;

function getElementSymbols (names) {
	var dupes,
	    validSymbols,
	    foundInvalidElement = false,
	    elements = {};

	names.forEach(function (name, idx, arr) {
		if (!foundInvalidElement) {
			validSymbols = getValidSymbols(name);
			foundInvalidElement = validSymbols.every(function (symbol) {
				if (!(symbol in elements)) {
					elements[symbol] = name;
					return false;
				}
				else
					return true;
			});
			if(foundInvalidElement)
				console.log("Invalid element " + name + " found.");
		}
	});

	return elements;
}

function getValidSymbols(name) {
	var i,
	    symbolArr = [];

	name.toLowerCase().split("").forEach(function (char, idx, charArr) {
		for (i = idx + 1; i < charArr.length; i++) { // iterate through remaining
			if (symbolArr.indexOf(char.toUpperCase() + charArr[i]) === -1)
				symbolArr.push(char.toUpperCase() + charArr[i]);
		}
	});

	return symbolArr;
}

console.log(getElementSymbols(names));