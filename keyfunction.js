// https://redd.it/4tqy5c

// key(

//  elements:  an array/list of stuff. number of items is leading array dimension,
//  key: an array/list of stuff.  Same amount of items as "elements".  If null, then defaults to same array as elements,
//  applyfunction:  function that will be called for each group of elements that have the same key.  Optionally, this function could also have the key parameter.  Results are aggregated in order of key appearance.
//  )

// 1. Histogram

// for each item in input, return a record with the key and the item count for that key

// input:

//  5 3 5 2 2 9 7 0 7 5 9 2 9 1 9 9 6 6 8 5 1 1 4 8 5 0 3 5 8 2 3 8 3 4 6 4 9 3 4 3 4 5 9 9 9 7 7 1 9 3 4 6 6 8 8 0 4 0 6 3 2 6 3 2 3 5 7 4 2 6 7 3 9 5 7 8 9 5 6 5 6 8 3 1 8 4 6 5 6 4 8 9 5 7 8 4 4 9 2 6 10

// output

//  5 13
//  3 12
//  2  8
//  9 14
//  7  8
//  0  4
//  1  5
//  6 13
//  8 11
//  4 12
// 10  1

// 2. grouped sum of field

// for each record use the first field as key, and return key and sum of field 2 (grouped by key)

// input:

// a 14
// b 21
// c 82
// d 85
// a 54
// b 96
// c 9
// d 61
// a 43
// b 49
// c 16
// d 34
// a 73
// b 59
// c 36
// d 24
// a 45
// b 89
// c 77
// d 68

// output:

// a 229
// b 314
// c 220
// d 272

// 3. nub (easier)

// the "nub of an array" can be implemented with key. It is similar to sql first function.

// for the input from 2. return the first element keyed (grouped) by first column

// output:

// a 14
// b 21
// c 82
// d 85

var histArr = require('./data/keyhistogram.json').array,
    sumObj = require('./data/keysum.json');

function key (elements, keys, applyFunc) {
	return applyFunc(elements, keys);
}

function histogram (elements, keys) {
	var histMap = new Map();

	elements.forEach(function (i) {
		if (!histMap.has(i))
			histMap.set(i, 1);
		else
			histMap.set(i, histMap.get(i) + 1);
	});

	return histMap;
}

function sums (elements, keys) {
	var sumMap = new Map();

	keys.forEach(function (i, idx) {
		if(sumMap.has(i))
			sumMap.set(i, sumMap.get(i) + elements[idx]);
		else
			sumMap.set(i, elements[idx]);
	});

	return sumMap;
}

function nubs (elements, keys) {
	var nubMap = new Map();

	keys.forEach(function (i, idx) {
		if(!nubMap.has(i))
			nubMap.set(i, elements[idx]);
	});

	return nubMap;
}

console.log(key(histArr, null, histogram));
console.log(key(sumObj.values, sumObj.keys, sums));
console.log(key(sumObj.values, sumObj.keys, nubs));