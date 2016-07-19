// The inhabitants of the planet Splurth are building their own periodic table of the elements. Just like Earth's periodic table has a chemical symbol for each element (H for Hydrogen, Li for Lithium, etc.), so does Splurth's. However, their chemical symbols must follow certain rules:

//    * All chemical symbols must be exactly two letters, so B is not a valid symbol for Boron.
//    * Both letters in the symbol must appear in the element name, but the first letter of the element name does not necessarily need to appear in the symbol. So Hg is not valid for Mercury, but Cy is.
//    * The two letters must appear in order in the element name. So Vr is valid for Silver, but Rv is not. To be clear, both Ma and Am are valid for Magnesium, because there is both an a that appears after an m, and an m that appears after an a.
//    * If the two letters in the symbol are the same, it must appear twice in the element name. So Nn is valid for Xenon, but Xx and Oo are not.

// As a member of the Splurth Council of Atoms and Atom-Related Paraphernalia, you must determine whether a proposed chemical symbol fits these rules.

// Write a function that, given two strings, one an element name and one a proposed symbol for that element, determines whether the symbol follows the rules. If you like, you may parse the program's input and output the result, but this is not necessary.

// The symbol will have exactly two letters. Both element name and symbol will contain only the letters a-z. Both the element name and the symbol will have their first letter capitalized, with the rest lowercase. (If you find that too challenging, it's okay to instead assume that both will be completely lowercase.)

// BONUS
// #1 Given an element name, find the valid symbol for that name that's first in alphabetical order. E.g. Gozerium -> Ei, Slimyrine -> Ie.
// #2 Given an element name, find the number of distinct valid symbols for that name. E.g. Zuulon -> 11.
// #3 The planet Blurth has similar symbol rules to Splurth, but symbols can be any length, from 1 character to the entire length of the element name. Valid Blurthian symbols for Zuulon include N, Uuo, and Zuuln. Complete challenge #2 for the rules of Blurth. E.g. Zuulon -> 47.


function validateElement (elem, abbr) {
	var first       = elem.toLowerCase().indexOf(abbr.toLowerCase().charAt(0)),
	    second      = elem.toLowerCase().indexOf(abbr.toLowerCase().charAt(1),
	                    first + 1),
	    validFirst  = first !== -1,
	    validSecond = second !== -1 && second > first;

	return validFirst && validSecond;
}

console.log(validateElement("Spenglerium", "Ee")); // true
console.log(validateElement("Zeddemorium", "Zr")); // true
console.log(validateElement("Venkmine", "Kn")); // true
console.log(validateElement("Stantzon", "Zt")); // false
console.log(validateElement("Melintzum", "Nn")); // false
console.log(validateElement("Tullium", "Ty")); // false

// Bonus #1

function elemToAlphabeticCode (elem) {
	var charArr,
	    first,
	    second;

  charArr = getCharCodes(elem.slice(0, -1)); // ignore last char for now
  first = String.fromCharCode(leastValue(charArr)).toUpperCase();

  charArr = getCharCodes(elem).slice(charArr.indexOf(first) + 1);
  second = String.fromCharCode(leastValue(charArr));

  return first + second;
}

// helper functions

function getCharCodes (str) {
	return str.toLowerCase().split("").map(function (e) {
		return e.charCodeAt(0);
	});
}

function leastValue (arr) {
	return arr.reduce(function (a, b) {
	  return Math.min(a, b);
	});
}

console.log(elemToAlphabeticCode("Gozerium")); // -> Ei,
console.log(elemToAlphabeticCode("Slimyrine")); // -> Ie

// Bonus #2

function distinctSymbols (elem) {
	var elemArr = elem.toLowerCase().split(""),
	    symbols = [],
	    i,
	    j;

	for (i = 0; i < elemArr.length; i ++) {
		for (j = i + 1; j < elemArr.length; j++) {
			if (symbols.indexOf(elemArr[i] + elemArr[j]) === -1)
				symbols.push(elemArr[i] + elemArr[j]);
		}
	}

	return symbols.length;
}

console.log(distinctSymbols("Zuulon"));


// Bonus #3 fail
//
// function distinctBlurthianSymbols (elem) {
// 	var elemStr = elem.toLowerCase(),
// 	    elemArr = elemStr.split(""),
// 	    symbols = [],
// 	    i, j, k, l, m;

// 	for (i = 0; i < elemArr.length; i ++) {
// 		if (symbols.indexOf(elemArr[i]) === -1) // one character
// 			symbols.push(elemArr[i]);
// 		for (j = i + 1; j < elemArr.length; j++) { // two characters
// 			if (symbols.indexOf(elemArr[i] + elemArr[j]) === -1)
// 				symbols.push(elemArr[i] + elemArr[j]);
// 			for (k = i + 2; k< elemArr.length; k++) {
// 				if (symbols.indexOf(elemArr[i] + elemArr[j] + elemArr[k]) === -1)
// 					symbols.push(elemArr[i] + elemArr[j] + elemArr[k]);
// 				for (l = i + 3; l < elemArr.length; l++) {
// 				if (symbols.indexOf(elemArr[i] + elemArr[j] + elemArr[k] + elemArr[l]) === -1)
// 					symbols.push(elemArr[i] + elemArr[j] + elemArr[k] + elemArr[l]);
// 				for (m = i + 4; m < elemArr.length; m++) {
// 					if (symbols.indexOf(elemArr[i] + elemArr[j] + elemArr[k] + elemArr[l] + elemArr[m]) === -1)
// 						symbols.push(elemArr[i] + elemArr[j] + elemArr[k] + elemArr[l] + elemArr[m]);
// 					}
// 				}
// 			}
// 		}
// 	}

// 	console.log(symbols);

// 	return symbols.length;
// }

// console.log(distinctBlurthianSymbols("Zuulon"));