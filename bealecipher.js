// https://redd.it/4r8fod

// In 1885, an author named James B. Ward published a pamphlet telling of a long-lost treasure available to anyone clever enough to solve the puzzle associated with it. Ward reported that around 1817, a man named Thomas Jefferson Beale stumbled upon gold and silver deposits in what is now Colorado. Agreeing to keep it all a secret, Beale’s team had spent the better part of two years quietly mining, then had taken the metals to Virginia by wagon and buried them in a vault underground between 1819 and 1821. Beale had written three notes explaining where the treasure was and who had legal rights to shares in it, encrypting each of these using a different text.

// Eventually, the second of the three texts was deciphered using a slightly altered version of the Declaration of Independence. Each number in the text corresponded to a word in the U.S. Declaration of Independence. The first letter of each of those words spelled the plaintext—with a few modifications for errors and spelling.

// Your mission today is to go treasure hunting and to write a program to decipher Beale's message.

// Input

// You'll be given a list of numbers, comma separated, representing the ciphertext given by Beale.

// Output

// Your program should consume the input and decrypt it. Remember - the first letter of that word number from the US Declaration of Independence. Spacing, punctuation, capitalization, and fixing spelling is left as an exercise to the treasure seeker (as Beale intended).

var fs = require("fs");

function decipher() {
	var numberArr = fs.readFileSync('./data/bealeciphernums.txt', 'utf-8').split(", "),
	    declarationArr = fs.readFileSync('./data/bealecipher.txt', 'utf-8').split(" ").filter(function (elem) {
					return (elem !== '.'); // remove random period
				});

	return numberArr.map(function (elem) {
		return declarationArr[elem - 1][0].toLowerCase();
	}).join("");
}

console.log(decipher());