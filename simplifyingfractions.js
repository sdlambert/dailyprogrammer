// https://redd.it/4uhqdb

// Description

// A fraction exists of a numerator (top part) and a denominator (bottom part) as you probably all know.

// Simplifying (or reducing) fractions means to make the fraction as simple as possible. Meaning that the denominator is a close to 1 as possible. This can be done by dividing the numerator and denominator by their greatest common divisor.

// Formal Inputs & Outputs
// Input description

// You will be given a list with 2 numbers seperator by a space. The first is the numerator, the second the denominator

// 4 8
// 1536 78360
// 51478 5536
// 46410 119340
// 7673 4729
// 4096 1024

// Output description

// The most simplified numbers

// 1 2
// 64 3265
// 25739 2768
// 7 18
// 7673 4729
// 4 1

// Notes/Hints

// Most languages have by default this kind of functionality, but if you want to challenge yourself, you should go back to the basic theory and implement it yourself.

// ES6 using node --harmony

"use strict";


let gcd = (a, b) => a % b === 0 ? b : gcd (b, a % b);

let reduceFraction = (a, b) => {
	let divideBy = gcd(a, b),
	    numerator = a / divideBy,
	    denominator = b / divideBy;

	return {numerator, denominator};
};

console.log(reduceFraction(4, 8));
console.log(reduceFraction(1536, 78360));
console.log(reduceFraction(51478, 5536));
console.log(reduceFraction(46410, 119340));
console.log(reduceFraction(7673, 4729));
console.log(reduceFraction(4096, 1024));