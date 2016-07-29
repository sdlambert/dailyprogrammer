// https://redd.it/4msu2x

// Description
// Write a program that takes input text from standard input and outputs the text -- transposed.

// Roughly explained, the transpose of a matrix

// A B C
// D E F

// is given by

// A D
// B E
// C F

// Rows become columns and columns become rows.

// Input

// One or more lines of text. Since the transpose is only valid for square matrices, append spaces to the shorter lines until they are of the same length. Characters may be multibyte (UTF-8) characters.

// Some
// text.

// Output

// The input text should be treated as a matrix of characters and flipped around the diagonal. I.e., the top right input character becomes the bottom left character of the output. Blank space at the end of output lines should be removed. Tab (\t) may be treated like any other character (don't replace it with spaces).

// St
// oe
// mx
// et
//  .

// Note that the lower left character is a space in the output, but nothing in the input.

let fs = require("fs");

function transpose(contents) {

	let lines = contents.split("\n"),
	    swapped = [],
	    i, j;

	lines = lines.filter(i => i !== '')
    .map(i => i.trimRight());

	const longest = lines.map(i => i.length)
    .reduce((i, j) => Math.max(i, j));

	lines = lines.map(i => padRight(longest, i).split(""));

	for(i = 0; i < lines.length; i++) {
		for (j = 0; j < longest; j++) {
			if (swapped[j] === undefined)
				swapped[j] = [];
			swapped	[j][i] = lines[i][j];
		}
	}

	return swapped.map(i => i.join(""));
}

function padRight(len, str) {
  let limit = len - str.length;

  while (limit !== 0) {
  	str += " ";
  	limit--;
  }

	return str;
}

fs.readFile("./data/transposetext.txt", "utf-8", function (err, contents) {
	console.log(transpose(contents));
});